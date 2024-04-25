export enum QuestionIds {
  gender = 'gender',
  relationship = 'relationship',
  isSingleParent = 'is-single-parent',
  isParent = 'is-parent',
  relationshipStatement = 'relationship-statement',
  previousRelationship = 'previous-relationship',
  partnerType = 'partner-type',
  partnerGender = 'partner-gender',
  tendToOverthink = 'tend-to-overthink',
  traitsMostImportant = 'traits-most-important',
  traitsEmotionalControl = 'traits-emotional-control',
  sexPriority = 'sex-priority',
  relationshipGoals = 'relationship-goals',
  source = 'source',
}

export enum QuestionTypes {
  singleAnswer = 'singleOption',
  multipleAnswers = 'multipleOption',
  text = 'text',
}

export interface BaseAnswer {
  title: string;
  nextQuestionId?: QuestionIds;//?
}

export interface BaseQuestion {
  id: QuestionIds;
  title: string;
  questionType: QuestionTypes;
  nextQuestionId?: QuestionIds;//?
  answers: BaseAnswer[];
  subTitle?: string;
}
