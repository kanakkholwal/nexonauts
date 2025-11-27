import axios from "axios";
import { nanoid } from "nanoid";
import React from "react";
import { DiGithubFull } from "react-icons/di";
import { TbBrandGumroad } from "react-icons/tb";
import { getSession } from "src/lib/auth";
import dbConnect from "src/lib/db";
import UserModel from "src/models/user";
import { sessionType } from "src/types/session";

// Define the icons and descriptions for each integration
const icons: { [key: string]: React.ElementType } = {
  github: DiGithubFull,
  gumroad: TbBrandGumroad,
};
const descriptions: { [key: string]: string } = {
  github: "Import your GitHub repositories and activity.",
  gumroad: "Import your Gumroad products.",
};

type usageCase = {
  name: string;
  description: string;
};

const usage_cases: { [key: string]: usageCase[] } = {
  github: [
    {
      name: "Import repositories",
      description: "Import your repositories from GitHub to your dashboard.",
    },
    {
      name: "Import activity",
      description: "Import your activity from GitHub to your dashboard.",
    },
  ],
  gumroad: [
    {
      name: "Import products",
      description: "Import your products from Gumroad to your dashboard.",
    },
    {
      name: "Import sales",
      description: "Import your sales from Gumroad to your dashboard.",
    },
  ],
};

// Define the integrations static data
export const INTEGRATIONS = Object.keys(icons);
export const INTEGRATION_DESCRIPTIONS = descriptions;
export const INTEGRATION_USAGE_CASES = usage_cases;

// Define the integration configuration
export const INTEGRATION_CONFIG: {
  [key: string]: {
    client_id: string;
    redirect_uri: string;
    scope: string;
    auth_url: string;
    getAuthUrl: () => string;
    required: string[];
    saveToken: (options: Record<string, any>) => Promise<any>;
  };
} = {
  github: {
    client_id: process.env.GITHUB_ID as string,
    redirect_uri: process.env.NEXTAUTH_URL + "/settings/integrations/github",
    scope: "user%20public_repo",
    auth_url: `https://github.com/login/oauth/authorize`,
    required: ["code"],
    getAuthUrl: function () {
      const params = new URLSearchParams({
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        scope: this.scope,
        state: nanoid(),
      });
      return `${this.auth_url}?${params.toString()}`;
    },
    saveToken: async function (options: Record<string, any>) {
      const url = "https://github.com/login/oauth/access_token";

      const dataBody = {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        redirect_uri: this.redirect_uri,
        code: options.code,
      };

      const response = await axios.post(url, dataBody, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = response.data;

      if (!data.access_token) {
        return Promise.reject("Error getting token");
      }

      const session = (await getSession()) as sessionType;
      await dbConnect();
      const user = await UserModel.findById(session.user._id)
        .select("integrations")
        .exec();
      console.log("User", user);
      if (!user) {
        return Promise.reject("User not found");
      }
      if (!user.integrations) {
        user.integrations = {};
        user.integrations.github = {};
      }
      user.integrations.github = {
        access_token: data.access_token,
        lastAuthorized: new Date().toISOString(),
        scope: this.scope,
        integrated: true,
      };
      await user.save();
      console.log("Token saved");

      return Promise.resolve(data);
    },
  },
  gumroad: {
    client_id: process.env.GUMROAD_APP_ID as string,
    redirect_uri: process.env.NEXTAUTH_URL + "/settings/integrations/gumroad",
    scope: "view_profile",
    auth_url: `https://gumroad.com/oauth/authorize`,
    getAuthUrl: function () {
      const params = new URLSearchParams({
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        scope: this.scope,
      });
      return `${this.auth_url}?${params.toString()}`;
    },
    required: ["code"],
    async saveToken(options: Record<string, any>) {
      const url = "https://api.gumroad.com/oauth/token";

      const dataBody = {
        code: options.code,
        client_id: this.client_id,
        client_secret: process.env.GUMROAD_APP_SECRET,
        redirect_uri: this.redirect_uri,
      };

      const response = await axios.post(url, dataBody);
      const data = response.data;

      if (!data.access_token) {
        console.log("Error saving token, data", data);
        return Promise.reject("Error saving token");
      }

      console.log("Success saving token", data);
      const session = (await getSession()) as sessionType;

      await dbConnect();
      const user = await UserModel.findById(session.user._id)
        .select("integrations")
        .exec();
      console.log("User", user);
      if (!user) {
        return Promise.reject("User not found");
      }
      if (!user.integrations) {
        user.integrations = {};
        user.integrations.gumroad = {};
      }
      user.integrations.gumroad = {
        access_token: data.access_token,
        lastAuthorized: new Date().toISOString(),
        scope: this.scope,
        integrated: true,
      };
      await user.save();
      console.log("Token saved");

      return Promise.resolve(data);
    },
  },
};

export class Integration {
  platform: string;
  description: string;
  usage_cases: usageCase[];

  constructor(platform: string) {
    this.platform = platform;
    if (!INTEGRATION_CONFIG[platform]) {
      throw new Error("Invalid platform");
    }
    this.description = descriptions[platform];
    this.usage_cases = usage_cases[platform];
  }

  async saveToken(options: Record<string, any>) {
    const integrationConfig = INTEGRATION_CONFIG[this.platform];
    return integrationConfig.saveToken(options);
  }

  getAuthUrl() {
    const integrationConfig = INTEGRATION_CONFIG[this.platform];
    return integrationConfig.getAuthUrl();
  }

  async revokeToken() {
    const session = (await getSession()) as sessionType;

    const user = await UserModel.findById(session.user._id)
      .select(`integrations.${this.platform}`)
      .exec();
    user.integrations[this.platform].integrated = false;
    user.integrations[this.platform].access_token = null;
    user.integrations[this.platform].lastAuthorized = null;
    await user.save();
  }

  async getIntegrationData() {
    const session = (await getSession()) as sessionType;
    const user = await UserModel.findById(session.user._id)
      .select(`integrations.${this.platform}`)
      .exec();
    return user.integrations[this.platform];
  }

  async isConnected() {
    const integrationData = await this.getIntegrationData();
    return integrationData.integrated;
  }
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
  className?: string;
}

export const Icon = ({ icon, className, ...props }: IconProps) => {
  const IconComponent = icons[icon];

  if (!IconComponent) return null; // Handle case where icon is not found

  return <IconComponent {...props} className={className} />;
};
