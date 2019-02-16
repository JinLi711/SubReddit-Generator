/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' &&
        request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;
    var speechText = ""; 
    const viewportProfile = Alexa.getViewportProfile(handlerInput.requestEnvelope);
    switch(viewportProfile) {
      case "HUB-LANDSCAPE-LARGE":
        speechText += "hub landscape large";
        break;
      case "HUB-LANDSCAPE-MEDIUM": 
        speechText += "hub landscape medium";
        break;
      case "HUB-ROUND-SMALL":
        speechText += "hub round small";
        break;
      case "TV-LANDSCAPE-XLARGE":
        speechText += "tv landscape extra large";
        break;
      case "MOBILE-LANDSCAPE-SMALL":
        speechText += "mobile landscape small";
        break;
      default:
        speechText += "echo device!";
        break;
    }
    console.log(speechText);
    if (speechText != "echo device!") {
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withSimpleCard(SKILL_NAME, randomFact)
        .addDirective({
          type : 'Alexa.Presentation.APL.RenderDocument',
          document : {
            "type": "APL",
            "version": "1.0",
            "theme": "dark",
            "import": [{
              "name": "alexa-layouts",
              "version": "1.0.0"
            }],
            "resources": [{
                "description": "Stock color for the dark theme",
                "colors": {
                  "colorTextPrimary": "#151920"
                }
              },
              {
                "description": "Stock color for the dark theme",
                "when": "${viewport.theme == 'dark'}",
                "colors": {
                  "colorTextPrimary": "#f0f1ef"
                }
              },
              {
                "description": "Standard font sizes",
                "dimensions": {
                  "textSizeBody": 48,
                  "textSizePrimary": 27,
                  "textSizeSecondary": 23,
                  "textSizeSecondaryHint": 25
                }
              },
              {
                "description": "Common spacing values",
                "dimensions": {
                  "spacingThin": 6,
                  "spacingSmall": 12,
                  "spacingMedium": 24,
                  "spacingLarge": 48,
                  "spacingExtraLarge": 72
                }
              },
              {
                "description": "Common margins and padding",
                "dimensions": {
                  "marginTop": 40,
                  "marginLeft": 60,
                  "marginRight": 60,
                  "marginBottom": 40
                }
              }
            ],
            "styles": {
              "textStyleBase": {
                "description": "Base font description; set color and core font family",
                "values": [{
                  "color": "@colorTextPrimary",
                  "fontFamily": "Amazon Ember"
                }]
              },
              "textStyleBase0": {
                "description": "Thin version of basic font",
                "extend": "textStyleBase",
                "values": {
                  "fontWeight": "100"
                }
              },
              "textStyleBase1": {
                "description": "dark version of basic font",
                "extend": "textStyleBase",
                "values": {
                  "fontWeight": "300"
                }
              },
              "mixinBody": {
                "values": {
                  "fontSize": "@textSizeBody"
                }
              },
              "mixinPrimary": {
                "values": {
                  "fontSize": "@textSizePrimary"
                }
              },
              "mixinSecondary": {
                "values": {
                  "fontSize": "@textSizeSecondary"
                }
              },
              "textStylePrimary": {
                "extend": [
                  "textStyleBase1",
                  "mixinPrimary"
                ]
              },
              "textStyleSecondary": {
                "extend": [
                  "textStyleBase0",
                  "mixinSecondary"
                ]
              },
              "textStyleBody": {
                "extend": [
                  "textStyleBase1",
                  "mixinBody"
                ]
              },
              "textStyleSecondaryHint": {
                "values": {
                  "fontFamily": "Bookerly",
                  "fontStyle": "italic",
                  "fontSize": "@textSizeSecondaryHint",
                  "color": "@colorTextPrimary"
                }
              }
            },
            "layouts": {},
            "mainTemplate": {
              "description": "********* Full-screen background image **********",
              "parameters": [
                "payload"
              ],
              "items": [{
                  "when": "${viewport.shape == 'round'}",
                  "type": "Container",
                  "direction": "column",
                  "items": [{
                      "type": "Image",
                      "source": "${payload.bodyTemplate7Data.backgroundImage.sources[0].url}",
                      "position": "absolute",
                      "width": "100vw",
                      "height": "100vh",
                      "scale": "best-fill"
                    },
                    {
                      "type": "AlexaHeader",
                      "headerTitle": "${payload.bodyTemplate7Data.title}",
                      "headerAttributionImage": "${payload.bodyTemplate7Data.logoUrl}"
                    },
                    {
                      "type": "Container",
                      "grow": 1,
                      "paddingLeft": "@marginLeft",
                      "paddingRight": "@marginRight",
                      "paddingBottom": "@marginBottom",
                      "items": [{
                        "type": "Text",
                        "text": "${payload.bodyTemplate7Data.textContent.primaryText.text}",
                        "fontSize": "@textSizeBody",
                        "spacing": "@spacingSmall",
                        "style": "textStyleBody"
                      }]
                    }
                  ]
                },
                {
                  "type": "Container",
                  "height": "100vh",
                  "items": [{
                      "type": "Image",
                      "source": "${payload.bodyTemplate7Data.backgroundImage.sources[0].url}",
                      "position": "absolute",
                      "width": "100vw",
                      "height": "100vh",
                      "scale": "best-fill"
                    },
                    {
                      "type": "AlexaHeader",
                      "headerTitle": "${payload.bodyTemplate7Data.title}",
                      "headerAttributionImage": "${payload.bodyTemplate7Data.logoUrl}"
                    },
                    {
                      "type": "Container",
                      "paddingLeft": "@marginLeft",
                      "paddingRight": "@marginRight",
                      "paddingBottom": "@marginBottom",
                      "items": [{
                        "type": "Text",
                        "text": "${payload.bodyTemplate7Data.textContent.primaryText.text}",
                        "fontSize": "@textSizeBody",
                        "spacing": "@spacingSmall",
                        "style": "textStyleBody"
                      }]
                    }
                  ]
                }
              ]
            }
          },
          datasources: {
            "bodyTemplate7Data": {
              "type": "object",
              "objectId": "bt7Sample",
              "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [{
                    "url": null,
                    "size": "small",
                    "widthPixels": 0,
                    "heightPixels": 0
                  },
                  {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/BT6_Background.png",
                    "size": "large",
                    "widthPixels": 0,
                    "heightPixels": 0
                  }
                ]
              },
              "title": "Item Selected",
              "textContent": {
                "primaryText": {
                  "type": "PlainText",
                  "text": "Here is your thought."
                }
              },
              "logoUrl": "https://s3.amazonaws.com/CAPS-SSE/echo_developer/52bb/d9fe68f2251746e9bf7e1d65931edc2b/APP_ICON?versionId=cfDuPMQnH4y48mJ5AgVTEZQxVapWLfvX&AWSAccessKeyId=AKIAJFEYRBGIHK2BBYKA&Expires=1550436287&Signature=LtCojai%2BT22kUsHq6i7n0rj1tPw%3D"
            }
          }
        })
        .getResponse(); 
    } else {
      return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, randomFact)
            .getResponse();
    }
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = "Thought Giver";
const GET_FACT_MESSAGE = "Here's a thought";
const HELP_MESSAGE = 'You can say tell me a thought ... How can I help you?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'Shower thought here. 1. Thanks for listening.',
  'Shower thought here. 2. Thanks for listening.',
  'Shower thought here. 3. Thanks for listening.',
];

const skillBuilder = Alexa.SkillBuilders.standards();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
