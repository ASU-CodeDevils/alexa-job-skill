# Job Search - Alexa Skill  

## Requirements:

- Amazon Web Services [account](aws.amazon.com)
- Amazon Developer [account](developer.amazon.com)
- A copy of the 'master' branch
- (optional) Amazon Echo Device [store](https://www.amazon.com/Amazon-Echo-Alexa-Family/b/ref=s9_acss_bw_cg_ODSAuCC_md1_w?node=9818047011&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-4&pf_rd_r=C7RCQSRX2B6QS6FFDXCN&pf_rd_t=101&pf_rd_p=1fec0ff0-871a-4fdf-a454-66aab26aa38c&pf_rd_i=9818047011#compare)

## Setup
#### Lambda Function
Log into [AWS Site](aws.amazon.com) and through the `compute` section, click on Lambda.

Click `Create a Lambda function` and on the following page, set the trigger source as `Alexa Skills Kit` and click next.

Fill in `Name` and `Description` to whatever you'd like, and make sure `Runtime` is set to Node.js and not Edge Node.js. Next we are going to upload a zip file so navigate into the `src/` folder of the repo on your machine.

Once in the `src/` folder, zip up the entire contents of the folder and head back to the `Configure Lambda` page.

In the `Lambda function code` section of the page, change the `Code entry type` to `Upload a .ZIP file` and upload the zip archive you made from the `src/` folder; remember that it should be of the files inside the folder and not the folder itself.

Further down the page there is a `Handler` setting, ensure that it says `index.handler`, in the `Role` setting make sure that you select "Choose an existing role", and lastly make sure that `Existing role` is set to `service-role/lambda_basic_execution`

Click next at the bottom of the page once the completed, review the summary page and select `Create Function`. After this is done, make a note of the `ARN` at the top right of the page and then navigate to the Alexa developer page via [developer.amazon.com](developer.amazon.com)


#### Alexa Custom Skill

On the Alexa page click on the `Get Started > ` button on Alexa Skills Kit.

On the top right click on `Add a New Skill`. On the new page for the skill setup, set the `Skill Type` to `Custom Interaction model`, `Name` with whatever name you want to call your service, and `Invocation Name` to what you want users to say to start the skill.  Click `Next`

In the `Intent Schema`, copy the content of `speechAssets/IntentSchema.json` into the text field and do the same for `Sample Utterances` text field and `speechAssets/SimpleUtterances_en_US.txt`. Click `Next` when finished. The Intent Schema is what the skill will use for the lambda functions in `src/index.js` and `Sample Utterances` is phrases that Alexa will attempt to parse for this skill.

On the `Global Fields` page copy the `ARN` from your lambda into the `AWS Lambda ARN (Amazon Resource Name)` and click next.  Depending how fast you completed the `Interaction Model` page, you may have to wait for this page to be fully active. Make sure that the button at the top is set to `Enabled` in order to test that the lambda function and skill are tied together.

In the `Service Simulator` section, in the `Enter Utterance` field, type in `Open $Invocation_Name` and click the button `Ask $Invocation_Name` to test that the function is linked, you should see in the `Lambda Response` field a JSON response with a field called `ssml` and a corresponding text with some sort of greeting from the skill.


## TODO and going forward

As of right now there is a lot to do to fix the current state of the skill:
- Get real conversation functioning
	- States be bidirectional
	- More phrases during converation
- Create parsing heuristics for narrowing results
	- Narrow down the results using keywords and skills
- Integrate `DynamoDB`
- Integrate `Card` feature to show selected responses.
