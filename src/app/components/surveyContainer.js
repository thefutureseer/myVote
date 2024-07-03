'use client';
import 'survey-core/defaultV2.min.css';
import '../../styles/survey.css';
import { Survey } from 'survey-react-ui';
import { Model } from "survey-core";
import voteJson from "../../data/voteScript";
const SurveyContainer = () => {
  const survey = new Model(voteJson);
  survey.onComplete.add(async function (sender, options) {
    options.showSaveInProgress();
    options.showSaveSuccess();
    sender.completedHtml = "Thank you for your vote! The winner is " + "*winner*" + ".";
    const finishedSurvey = sender.data;
try {
  const response = await fetch('/api/results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(finishedSurvey),
  });
  if (response.ok) {
    console.log('Vote results saved successfully');
  } else {
    console.error('Failed to save vote results', response.statusText);
  }
} catch (error) {
  console.error('Error saving poll results', error);
};
});
  return <Survey model={survey}/>
};
export default SurveyContainer;