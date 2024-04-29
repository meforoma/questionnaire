import {
  BaseQuestion,
  QuestionIds,
  QuestionTypes,
  Replacements,
} from '@/data/types';
import { objectifyTitles } from '@/data/utils';

export const replacements: Replacements = {
  [QuestionIds.isParent]: {
    yes: ' who has children',
    no: '',
  },
  [QuestionIds.isSingleParent]: {
    yes: ' who has children',
    no: '',
  },
};

export const entryQuestion = {
  [QuestionIds.entry]: {
    id: QuestionIds.entry,
    title: 'what is your name?',
    questionType: QuestionTypes.text,
    nextQuestionId: QuestionIds.gender,
  },
};

const finalQuestion = {
  [QuestionIds.final]: {
    id: QuestionIds.final,
    title: `where did you hear about us?`,
    questionType: QuestionTypes.multipleChoice,
    isFinalQuestion: true,
    answers: objectifyTitles([
      'Poster or Billboard',
      'Friend or Family',
      'Instagram',
      'Direct Mail or Package Insert',
      'Online TV or Streaming TV',
      'TV',
      'Radio',
      'Search Engine (Google, Bing, etc.)',
      'Newspaper or Magazine',
      'Facebook',
      'Blog Post or Website Review',
      'Podcast',
      'Influencer',
      'Youtube',
      'Pinterest',
      'Other',
    ]),
  },
};

const starters = {
  [QuestionIds.gender]: {
    id: QuestionIds.gender,
    title: 'select your gender',
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.relationship,
    answers: objectifyTitles(['male', 'female']),
  },
  [QuestionIds.relationship]: {
    id: QuestionIds.relationship,
    title: 'so we can get to know you better, tell us about your relationship status.',
    questionType: QuestionTypes.singleChoice,
    answers: [
      {
        title: 'single',
        nextQuestionId: QuestionIds.isSingleParent,
      },
      {
        title: 'in a relationship',
        nextQuestionId: QuestionIds.isParent,
      },
    ],
  },
};

const singleFLow = {
  [QuestionIds.isSingleParent]: {
    id: QuestionIds.isSingleParent,
    title: 'are you a single parent?',
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.relationshipStatement,
    answers: objectifyTitles(['yes', 'no']),
  },
  [QuestionIds.relationshipStatement]: {
    id: QuestionIds.relationshipStatement,
    title: `single {{${QuestionIds.gender}}}{{${QuestionIds.isSingleParent}}} need a slightly different approach to improve their relationship. Which statement best describes you?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.tendToOverthink,
    answers: objectifyTitles([
      `i’m very unhappy with how things are going in my relationship`,
      `i’m unhappy with parts of my relationship, but some things are working well`,
      `i’m generally happy in my relationship`,
    ]),
  },
  [QuestionIds.tendToOverthink]: {
    id: QuestionIds.tendToOverthink,
    title: `do you tend to overthink?`,
    questionType: QuestionTypes.singleChoice,
    nextInfoId: QuestionIds.infoHowItWorks,
    answers: [
      {
        title: `yes`,
        nextQuestionId: QuestionIds.traitsMostImportant,
      },
      {
        title: `no`,
        nextQuestionId: QuestionIds.traitsEmotionalControl,
      },
    ],
  },
  [QuestionIds.traitsMostImportant]: {
    id: QuestionIds.traitsMostImportant,
    title: `what is most important to you?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.final,
    answers: objectifyTitles([
      `success`,
      `romance`,
      `stability`,
      `freedom`,
    ]),
  },
  [QuestionIds.traitsEmotionalControl]: {
    id: QuestionIds.traitsEmotionalControl,
    title: `is emotional control tricky for you?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.final,
    answers: objectifyTitles([
      `yes`,
      `sometimes`,
      `rarely`,
      `not at all`,
    ]),
  },
};

const relationshipFlow = {
  [QuestionIds.isParent]: {
    id: QuestionIds.isParent,
    title: 'are you a parent?',
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.previousRelationship,
    answers: objectifyTitles(['yes', 'no']),
  },
  [QuestionIds.previousRelationship]: {
    id: QuestionIds.previousRelationship,
    title: `{{${QuestionIds.gender}}}{{${QuestionIds.isParent}}} need a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.partnerType,
    answers: objectifyTitles([
      `i was unhappy with low things were going in my relationship`,
      `i was unhappy with parts of my relationship, but some thing were working`,
      `i was generally happy with my relationship`,
      `I’ve never been in a relationship`,
    ]),
  },
  [QuestionIds.partnerType]: {
    id: QuestionIds.partnerType,
    title: `is your partner an introvert or extrovert?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.partnerGender,
    answers: objectifyTitles([
      `introvert`,
      `extrovert`,
      `a bit of both`,
    ]),
  },
  [QuestionIds.partnerGender]: {
    id: QuestionIds.partnerGender,
    title: `what is your partner's gender?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.sexPriority,
    answers: objectifyTitles(['male', 'female']),
  },
  [QuestionIds.sexPriority]: {
    id: QuestionIds.sexPriority,
    title: `do you agree with the statement below?`,
    subTitle: `my partner and I make sex a priority in our relationship`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.relationshipGoals,
    answers: objectifyTitles([
      `strongly agree`,
      `agree`,
      `neutral`,
      `disagree`,
      `strongly disagree`,
    ]),
  },
  [QuestionIds.relationshipGoals]: {
    id: QuestionIds.relationshipGoals,
    title: `when you think about your relationship goals, you feel...?`,
    questionType: QuestionTypes.singleChoice,
    nextQuestionId: QuestionIds.final,
    answers: objectifyTitles([
      `optimistic! they are totally doable, with some guidance`,
      `cautious. i’ve struggled before, but i’m hopeful`,
      `i’m feeling a little anxious, honestly`,
    ]),
  },
};

const info = {
  [QuestionIds.infoHowItWorks]: {
    id: QuestionIds.infoHowItWorks,
    title: 'so how does it work?',
    subTitle: 'we analyze hundreds of data points to create your unique astrological blueprint. This is combined with AI to tailor-make your astrological insights, based on your answers. We’re going to change your relationship with astrology.',
    questionType: QuestionTypes.singleChoice,
    answers: [
      {
        title: 'next',
      },
    ],
  },
};

export const configPool: Record<
  QuestionIds,
  BaseQuestion
> = {
  ...entryQuestion,
  ...starters,
  ...singleFLow,
  ...relationshipFlow,
  ...finalQuestion,
  ...info,
};
