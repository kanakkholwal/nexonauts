import axios from "axios";

// for browser
export const registerView = async ({ title, slug, type,postId }) => {
    if(process.env.NODE_ENV === "development"){
        console.log("registerView", title, slug, type,postId);
        return null;
    }
    await axios.post("/api/pages", {
        slug: slug,
        type: type,
        title: title,
        postId: postId,
        increase: ["view"]
    }).then(({ data }) => {
        console.log(data.message);
    }).catch((error) => {
        console.log(error);
    })
}
export const registerShare = async ({ title, slug, type }) => {
    await axios.post("/api/pages", {
        slug: slug,
        type: type,
        title: title,
        increase: ["share"]
    }).then(({ data }) => {
        console.log(data.message);
    }).catch((error) => {
        console.log(error);
    })
}
// for server
export const getAnalytics = (pages) => pages.map((page) => page.analytics).flat();
export const getAnalyticsByAction = (pages, action) => pages.map((page) => page.analytics.filter((analytic) => analytic.action === action)).flat();
export const getTypeAnalytics = (pages, type) => pages.filter((page) => page.type === type).map((page) => page.analytics).flat();

export const pageWise = (pages) => {
    let categories = [];

    pages.forEach((page) => {
        categories.push(page.type);
    });
    const labels = [...new Set(categories)];
    const data = {
        series: labels.map((category) => {
            const count = pages.filter(({ type }) => type === category).reduce((prev, curr) => prev + curr.analytics.length, 0);
            return count;
        }),
        labels,
    }
    console.log("pageWise", data);
    return data
}
export const authWise = (pages) => {
    let data = {
        series: [0, 0],
        labels: ["Anonymous", "Authenticated"]
    };

    const analytics = getAnalytics(pages);


    data.series[0] = analytics.filter(({ user, sessionId }) => user === null || sessionId === null).length;
    data.series[1] = analytics.filter(({ user }) => user !== null).length;

    console.log("authWise", data);
    return data
}
export const ConversionRate = (pages, interval) => {
    const currentTime = new Date();
    const pastTime = new Date();

    // Set the past time based on the desired interval
    switch (interval) {
        case 'hour':
            pastTime.setHours(currentTime.getHours() - 1);
            break;
        case 'day':
            pastTime.setDate(currentTime.getDate() - 1);
            break;
        case 'week':
            pastTime.setDate(currentTime.getDate() - 7);
            break;
        case 'month':
            pastTime.setMonth(currentTime.getMonth() - 1);
            break;
        case 'year':
            pastTime.setFullYear(currentTime.getFullYear() - 1);
            break;
        default:
            break;
    }

    let totalViews = 0;
    let totalShares = 0;
    let pastViews = 0;
    let pastShares = 0;

    // Count total views and shares for the current and past time interval
    getAnalytics(pages).forEach((analytics) => {
        const timestamp = new Date(analytics.timestamp);

        if (timestamp >= pastTime && timestamp <= currentTime) {
            if (analytics.action === 'view') {
                totalViews++;
                if (timestamp >= pastTime && timestamp <= currentTime) {
                    pastViews++;
                }
            } else if (analytics.action === 'share') {
                totalShares++;
                if (timestamp >= pastTime && timestamp <= currentTime) {
                    pastShares++;
                }
            }
        }
    });


    // Calculate conversion rates
    const currentConversionRate = totalShares / totalViews;
    const pastConversionRate = pastShares / pastViews;
    const formattedCurrentConversionRate = (currentConversionRate * 100).toFixed(2); // Convert to percentage with 2 decimal places
    const formattedPastConversionRate = (pastConversionRate * 100).toFixed(2); // Convert to percentage with 2 decimal places

    return {
        currentConversionRate: parseFloat(formattedCurrentConversionRate),
        pastConversionRate: parseFloat(formattedPastConversionRate),
    };
};
export const getPopularPages = (pages, limit) => {
  // Create an array of pages with their total views
  const pagesWithViews = pages.map((page) => {
    const totalViews = page.analytics.filter((analytics) => analytics.action === 'view').length;
    return {
     ...page,
      totalViews,
    };
  });

  // Sort the pages based on total views in descending order
  const sortedPages = pagesWithViews.sort((a, b) => b.totalViews - a.totalViews);

  // Return the popular pages up to the specified limit
  const popularPages = sortedPages.slice(0, limit);

  return popularPages;
};
export const applyFilters = (pages, filters, startDate, endDate) => {
    let filteredPages = pages;
  
    // Apply filters
    if (filters.length > 0) {
      filteredPages = filteredPages.filter((page) => filters.includes(page.type));
    }
  
    // Apply date range
    filteredPages = filteredPages.filter((page) => {
      const analyticsInRange = page.analytics.filter((analytics) => {
        const timestamp = new Date(analytics.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });
  
      return analyticsInRange.length > 0;
    });
  
    return filteredPages;
  };
  
const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const milliSecsInDay = 86400000;
    return Math.ceil(((date - oneJan) / milliSecsInDay + oneJan.getDay() + 1) / 7);
};

export const intervalWise = (pages, interval) => {
    const analyticsByInterval = {
        Views: [],
        Shares: [],
    };

    pages.forEach((page) => {
        page.analytics.forEach((analytics) => {
            const timestamp = new Date(analytics.timestamp);
            let key;

            switch (interval) {
                case 'hourly':
                    key = timestamp.getHours();
                    break;
                case 'daily':
                    key = timestamp.toDateString();
                    break;
                case 'weekly':
                    key = getWeekNumber(timestamp);
                    break;
                case 'monthly':
                    key = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}`;
                    break;
                case 'yearly':
                    key = timestamp.getFullYear().toString();
                    break;
                default:
                    key = timestamp.toDateString();
                    break;
            }

            if (!analyticsByInterval.Views[key]) {
                analyticsByInterval.Views[key] = 0;
            }
            if (!analyticsByInterval.Shares[key]) {
                analyticsByInterval.Shares[key] = 0;
            }

            if (analytics.action === 'view') {
                analyticsByInterval.Views[key]++;
            } else if (analytics.action === 'share') {
                analyticsByInterval.Shares[key]++;
            }
        });
    });
    return {
        series: [
            {
                name: 'Views',
                data: Object.values(analyticsByInterval.Views),
                fontSize: '12px',
            },
            {
                name: 'Shares',
                data: Object.values(analyticsByInterval.Shares),
                fontSize: '12px',

            },
        ],
        xaxis: {
            categories: Object.keys(analyticsByInterval.Views),
            type: interval === 'hourly' ? 'numeric' : 'datetime',
        },
    };
};
