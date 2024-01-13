import { Label } from "@/components/ui/label";
import { AppType } from "src/types/app";
import { useBuilderContext } from '../common/context/builder-context';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState } from 'react';
import toast from "react-hot-toast";
import { SessionUserType } from 'src/types/user';


export default function OutputTab({
    app,
    mode,
    user
}: {
    app: AppType,
    mode: "edit" | "submit",
    user: SessionUserType
}) {
    const { builderData, updateBuilderData } = useBuilderContext();
    console.log(builderData);

    const [isLoading, setIsLoading] = useState(false);

    async function updateApp(appObject: AppType) {



        return new Promise(async (resolve, reject) => {


            await axios.put(`/api/apps/${builderData._id.toString()}/update`, {
                appData: appObject,
                userId: user._id
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        toast.success("App Updated successfully");
                        resolve(response.data);
                    } else {
                        toast.error("Something went wrong please try again");
                        reject(response.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong please try again");
                    reject(err.detail);
                })
                .finally(() => {
                    setIsLoading(false);
                })

        })

    }


    function CreatePostaleObject(): AppType {

        return {
            ...builderData,
            path: "/apps/" + app.appId.toLowerCase().replaceAll(/ /g, "-").replaceAll("_", "-"),


            // data: {
            //     ...app.data,
            //     prompt: prompt,
            //     model: app.data.model,
            //     hyperparameters: {
            //         ...app.data.hyperparameters,
            //         temperature: app.data.hyperparameters.temperature,
            //         max_tokens: app.data.hyperparameters.max_tokens,
            //         top_p: app.data.hyperparameters.top_p,
            //         frequency_penalty: app.data.hyperparameters.frequency_penalty,
            //         presence_penalty: app.data.hyperparameters.presence_penalty,
            //         topP: app.data.hyperparameters.topP,
            //         topK: app.data.hyperparameters.topK,
            //         maxOutputTokens: app.data.hyperparameters.maxOutputTokens,
            //     }
            // }
        }
    }


    return (<> <div className=" w-full mb-2">
        <Label htmlFor='output_type'>Output Type
        <span className="text-xs text-red-400"> *</span>

        </Label>
        <Select
            name='output_type'
            onValueChange={(value) => {
                updateBuilderData({
                    ...builderData,
                    formFlow: {
                        ...builderData.formFlow,
                        outputs: {
                            ...builderData.formFlow.outputs,
                            render_type: value as string
                        }
                    }
                })
            }}
            defaultValue={builderData.formFlow.outputs.render_type ?? "plain/text"}
        >
            <SelectTrigger className="w-[180px] bg-slate-100">
                <SelectValue placeholder="Output Type" />
            </SelectTrigger>
            <SelectContent>
                {OUTPUT_TYPES.map((item) => {
                    return (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>

    </div>


        <div className='flex justify-between items-center gap-2 mt-2'>
            <Label htmlFor="output_save_to_db">
                Save to Database
            </Label>
            <Switch
                id="output_save_to_db" name="output_save_to_db"
                checked={builderData.formFlow.outputs.save_to_db ?? false}
                disabled={isLoading || user.account_type === "free"}

                onCheckedChange={(checked) => {
                    updateBuilderData({
                        ...builderData,
                        formFlow: {
                            ...builderData.formFlow,
                            outputs: {
                                ...builderData.formFlow.outputs,
                                save_to_db: checked as boolean
                            }
                        }
                    })

                }}
            />
        </div>
        <div className='flex justify-between items-center gap-2 mt-2'>

            <Button disabled={isLoading}
                onClick={() => {
                    setIsLoading(true);
                    toast.promise(updateApp(CreatePostaleObject()), {
                        loading: "Saving...",
                        success: (data) => {
                            setIsLoading(false);
                            return "Saved";
                        },
                        error: (err) => {
                            setIsLoading(false);
                            return err;
                        },
                    });
                    

                }}
                className="w-full"
            >
                Update and Submit
            </Button>
            {/* {finalSubmit ?
                        <>

                            <div className='text-center'>{finalSubmitText}</div>
                        </>
                        :
                        <>
                            <DialogHeader>
                                <DialogTitle>AI Tool Distribution Agreement</DialogTitle>
                                <DialogDescription>
                                    <p>This AI tool distribution agreement is between CRCJ TECHNOLOGIES PRIVATE LIMITED (Textify AI), a company limited by shares (the "Distributor") and , {session?.user?.name}, an individual (the "Provider").
                                        The Provider has developed and licenses the AI Tool program known as {builderData.name} .
                                        The Distributor operates various websites, including https://www.textify.ai (the "Site").
                                        The Provider wants to publish the AI tool through the Site, with the Distributor's assistance.
                                        The parties therefore agree as follows:
                                    </p>

                                    {showTerms && <div className='border-2 rounded max-h-[60vh] overflow-auto px-4 my-4 shadow'
                                        style={{ border: "1px solid black" }}>
                                        <h6>1. LICENSE; NO EXCLUSIVITY.</h6>
                                        <ol>
                                            <li>
                                                License. The Provider gives the Distributor a nonexclusive right and license to:
                                                <ol>
                                                    <li>
                                                        market the AI tool to licensees or potential licensees; and
                                                    </li>
                                                    <li>
                                                        distribute the AI tool and licenses to the AI tool to licensees or potential licensees.
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>No Ownership; No Exclusivity. : The Distributor acknowledges that:
                                                <ol>
                                                    <li>
                                                        the Provider owns all right, title, and interest in the AI tool;
                                                    </li>
                                                    <li>
                                                        the Distributor acquires no interest in the AI tool, except for the right to offer for distribution or to license the AI tool to third parties in accordance with the terms of this agreement; and
                                                    </li>
                                                    <li>
                                                        nothing contained in this agreement restricts the Provider's right to sell, license, or otherwise grant rights in the AI tool to third parties.
                                                    </li>
                                                </ol>

                                            </li>
                                        </ol>
                                        <h6>2.  TERM AND TERMINATION.</h6>
                                        <ol>
                                            <li>Term. This agreement will become effective as described in section 14 and continue for an initial term of 6 months (the "Term"). Unless either party gives written notice to the other at least 30 days before the end of the Term, this agreement will renew automatically for an additional 6 month term. This automatic extension will continue to apply at the end of each extended period until the agreement is terminated. </li>
                                            <li>Termination. This agreement may be terminated:
                                                <ol>
                                                    <li>
                                                        by either party, on provision of 30 days' written notice before the end of a Term;
                                                    </li>
                                                    <li>
                                                        by either party for a material breach of any provision of this agreement by the other party, if the other party's material breach is not cured within 30 days of receipt of written notice of the breach.

                                                    </li>
                                                </ol>
                                            </li>
                                            <li>Effect of Termination. After the termination of this agreement for any reason, the Distributor shall:

                                                <ol>
                                                    <li>
                                                        immediately stop all further publication, sale, and other use of the AI tool; and
                                                    </li>
                                                    <li>
                                                        remove all AI tools from the Site;
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                        <h6>3. DISTRIBUTION, MARKETING, AND SUPPORT.</h6>
                                        <p>The Distributor shall offer for distribution and licensing the AI tool on the Site via API calls. The Provider will make available to the Distributor a functional API framework and collateral material and content to allow the Distributor to offer for distribution and licensing the AI tool, including marketing and delivery of the AI tool to customers.
                                            The Distributor shall have the sole discretion to determine the manner of all marketing, offering, distributing, payment, or licensing of the AI tool on the Site, if those efforts are consistent with this agreement.</p>
                                        <h6>4.  FEES</h6>
                                        <ol>
                                            <li>
                                                The Distributor shall charge a fee to the AI tool users for the electronic transmission and usage of the AI tool as set forth below.
                                            </li>
                                            <li>
                                                The Provider will receive a fee from the Distributor for providing the AI tool to the Distributor and permitting the usage of the AI tool by the Distributor to its customers.
                                            </li>
                                        </ol>
                                        <p>These fees shall be based on a per API call unit price generated by the usage of the AI tool by the Distributor.</p>
                                        <h6>5. PAYMENT OF FEES.</h6>
                                        <p>Within 7 days after the end of each month, the Distributor shall send the Provider an API call statement (the "Statement") and pay the Provider's fee for the AI tools published on the Site. With each fee payment, the Distributor shall provide a Statement containing reasonable explanation of the usage and revenue calculations.</p>
                                        <h6>6.  PROVIDER REPRESENTATIONS.</h6>
                                        <p>The Provider hereby represents that:</p>
                                        <ol>
                                            <li>
                                                it has developed the AI tool and owns all intellectual property interest in the AI tool;
                                            </li>
                                            <li>
                                                it owns all interest in the AI tool and any documentation;
                                            </li>
                                            <li>
                                                neither the AI tool nor its documentation infringe or will infringe the intellectual property rights or other rights of any third party;
                                            </li>
                                            <li>
                                                it has the right to authorize the Distributor to market, offer for sale, and distribute the AI tool under this agreement.

                                            </li>
                                        </ol>
                                        <h6>7.  NO EMPLOYMENT RELATIONSHIP.</h6>
                                        <p>Neither party, their agents, or their employees are employees, agents, or representatives of the other party. Neither party may enter into any contract or commitment in the name or on behalf of the other party, or to bind the other party in any capacity.</p>
                                        <h6>8. LIMITATION OF LIABILITY.</h6>
                                        <p style={{
                                            textTransform: 'uppercase'
                                        }}>EXCEPT FOR CLAIMS IN SECTION 9 BELOW, IN NO EVENT WILL EITHER PARTY BE LIABLE OR RESPONSIBLE TO THE OTHER FOR ANY TYPE OF INCIDENTAL, PUNITIVE, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES RELATING TO THIS AGREEMENT, INCLUDING LOST REVENUE, LOST PROFITS, LOSSES ASSOCIATED WITH TRANSACTIONS ENTERED OR NOT ENTERED INTO ON THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF THOSE DAMAGES, WHETHER ARISING UNDER ANY THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE. EACH PARTY'S LIABILITY TO THE OTHER PARTY OR ANY THIRD PARTIES IS LIMITED TO THE LESSER OF: (i) THE AMOUNT PAYABLE BY THE DISTRIBUTOR TO THE PROVIDER UNDER THIS AGREEMENT DURING THE 12-MONTH PERIOD IMMEDIATELY PRECEDING THE DATE ON WHICH THE LOSS OR DAMAGE FIRST OCCURRED; OR (ii) $1.00.</p>
                                        <h6>9. INDEMNIFICATION OF DISTRIBUTOR.</h6>
                                        <p>The Provider is solely responsible for the representations listed in section 6 above and its claimed intellectual property and ownership rights in the AI tool. The Provider shall indemnify the Distributor against any award, charge, claim, compensatory damages, cost, damages, exemplary damages, diminution in value, expense, fee, fine, interest, judgment, liability, settlement payment, penalty or other loss or any attorney's or other professional's fee and disbursement, court filing fee, court cost, arbitration fee, arbitration cost, witness fee, and each other fee and cost of investigating and defending or asserting a claim for indemnification arising out of any violation of this agreement, or from infringement or any claim of infringement of any patent, trademark, copyright, or trade secret with respect to the AI tool. If there is a legal action that seeks remedy from the Distributor concerning the Provider's warranty, infringement of copyright, patent, trade secret, or other proprietary right in the AI tool, the Distributor shall immediately notify the Provider of that action. The Distributor's failure to provide timely notification shall not limit its right to seek indemnification, unless that failure has a material impact on the Provider's defense of the claim.</p>
                                        <h6>10 .INTERRUPTION OF SERVICE.</h6>
                                        <p>Although the Distributor will attempt to keep its Site operational at all times, a certain amount of downtime and interruption of service is inevitable. The Distributor is not responsible for any interruption of service to the Site and the Provider shall not hold the Distributor liable for any consequences of interruption of the Site, regardless of the cause.</p>

                                        <h6>11 .GOVERNING LAW.</h6>
                                        <p>Choice of Law. The laws of the Union of India govern this agreement.</p>
                                        <h6>12 .COUNTERPARTS; ELECTRONIC SIGNATURES.</h6>
                                        <ol>
                                            <li>Counterparts. The parties may execute this agreement in any number of counterparts, each of which is an original but all of which constitute one and the same instrument.
                                            </li>
                                            <li>Electronic Signatures. This agreement, agreements ancillary to this agreement, and related documents entered into in connection with this agreement are signed when a party's signature is delivered by facsimile, email, or other electronic medium. These signatures must be treated in all respects as having the same force and effect as original signatures.
                                            </li>
                                        </ol>
                                        <h6>13 .ENTIRE AGREEMENT.
                                        </h6>
                                        <p>This agreement constitutes the final agreement of the parties. It is the complete and exclusive expression of the parties' agreement about the subject matter of this agreement. All prior and contemporaneous communications, negotiations, and agreements between the parties relating to the subject matter of this agreement are expressly merged into and superseded by this agreement. The provisions of this agreement may not be explained, supplemented, or qualified by evidence of trade usage or a prior course of dealings. Neither party was induced to enter this agreement by, and neither party is relying on, any statement, representation, warranty, or agreement of the other party except those set forth expressly in this agreement. Except as set forth expressly in this agreement, there are no conditions precedent to this agreement's effectiveness.
                                        </p>
                                        <h6>14 . EFFECTIVENESS</h6>
                                        <p>This agreement will become effective when all parties have signed it. The date this agreement is signed by the last party to sign it (as indicated by the date associated with that party's signature) will be deemed the date of this agreement.
                                        </p>
                                    </div>}

                                    <div className='my-2 text-md underline text-center font-medium cursor-pointer' onClick={() => {
                                        setShowTerms(!showTerms)
                                    }}>
                                        {showTerms ? "Hide Terms" : "Show Terms"}
                                    </div>

                                    <h6 className='text-center'>[SIGNATURE PAGE FOLLOWS]
                                    </h6>
                                    <p>Each party is signing this agreement on the date stated opposite that party's signature.
                                    </p>
                                    <p>CRCJ Technologies Private Limited</p>

                                    <div className='d-flex g-2 align-items-center justify-content-around'>
                                        <p>Date : {new Date().toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}</p>
                                        <div>
                                            <p>By: </p>
                                            <p>Name : Chirag Jain</p>
                                            <p>Title : CEO</p>
                                        </div>
                                    </div>
                                    <div className='d-flex g-2 align-items-center justify-content-around'>
                                        <p>Date : {new Date().toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}</p>
                                        <div>
                                            <p>By: </p>
                                            <p>Name : {session?.user?.name}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex items-center justify-center space-x-2 my-2 w-full'>

                                            <Checkbox id="terms"
                                                defaultChecked={checked}
                                                onCheckedChange={(value) => {

                                                    setChecked(value as boolean)
                                                }}
                                            />
                                            <Label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                I have read and agree to the terms and conditions of this agreement.
                                            </Label>

                                        </div>
                                        <Button
                                            disabled={!checked}
                                            onClick={() => {
                                                toast.success("Agreement Signed");
                                                HandlePublish();
                                                setFinalSubmit(true)

                                            }}
                                        >
                                            {mode === "edit" ? "Update" : "Submit"}
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </>
                    } */}


        </div>


    </>)
}
const OUTPUT_TYPES = [
    "markdown",
    "html",
    "plain/text",
]
const replaceWords = (sentence: string, wordList: string[]) => {
    let replacedSentence = sentence;

    for (const word of wordList) {
        const regex = new RegExp(`@${word}\\b`, 'g');
        replacedSentence = replacedSentence.replace(regex, `<<<USER_INPUT_VALUE>>>${word}<<</USER_INPUT_VALUE>>>`);
    }

    return replacedSentence;
};