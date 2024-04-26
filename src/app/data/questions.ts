import {
  BaseQuestion,
  QuestionIds,
  QuestionTypes,
} from "@/data/types";
import { objectifyTitles } from "@/data/utils";

export const entryQuestion = {
  [QuestionIds.entry]: {
    id: QuestionIds.entry,
    title: 'what is your name?',
    // questionType: QuestionTypes.text,
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.gender,
    answers: objectifyTitles(['paul', 'tiffany']),
  },
};

const starters = {
  [QuestionIds.gender]: {
    id: QuestionIds.gender,
    title: 'select your gender',
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.relationship,
    answers: objectifyTitles(['male', 'female']),
  },
  [QuestionIds.relationship]: {
    id: QuestionIds.relationship,
    title: 'so we can get to know you better, tell us about your relationship status.',
    questionType: QuestionTypes.singleAnswer,
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
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.relationshipStatement,
    answers: objectifyTitles(['yes', 'no']),
  },
  [QuestionIds.relationshipStatement]: {
    id: QuestionIds.relationshipStatement,
    title: `{Gender} {who have children (if have children)} need a slightly different approach to improve their relationship. Which statement best describes you?`,
    questionType: QuestionTypes.singleAnswer,
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
    questionType: QuestionTypes.singleAnswer,
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
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.source,
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
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.source,
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
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.previousRelationship,
    answers: objectifyTitles(['yes', 'no']),
  },
  [QuestionIds.previousRelationship]: {
    id: QuestionIds.previousRelationship,
    // single !?
    title: `single {gender} {who have children (if have children)} need a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?`,
    questionType: QuestionTypes.singleAnswer,
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
    questionType: QuestionTypes.singleAnswer,
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
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.sexPriority,
    answers: objectifyTitles(['male', 'female']),
  },
  [QuestionIds.sexPriority]: {
    id: QuestionIds.sexPriority,
    title: `do you agree with the statement below?`,
    subTitle: `“My partner and I make sex a priority in our relationship”`,
    questionType: QuestionTypes.singleAnswer,
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
    questionType: QuestionTypes.singleAnswer,
    nextQuestionId: QuestionIds.source,
    answers: objectifyTitles([
      `optimistic! they are totally doable, with some guidance`,
      `cautious. i’ve struggled before, but i’m hopeful`,
      `i’m feeling a little anxious, honestly`,
    ]),
  },
};

const finals = {
  [QuestionIds.source]: {
    id: QuestionIds.source,
    title: `where did you hear about us?`,
    questionType: QuestionTypes.singleAnswer,
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

export const questionsPool: Record<
  QuestionIds,
  BaseQuestion
> = {
  ...entryQuestion,
  ...starters,
  ...singleFLow,
  ...relationshipFlow,
  ...finals,
};
