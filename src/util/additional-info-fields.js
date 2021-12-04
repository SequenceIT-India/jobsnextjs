import { LABELS } from "./additional-info-labels";

export const jsCreateProfileLabels = {
  awards: {
    type: "array",
    fields: {
      awardTitle: {
        name: LABELS.PLACE_HOLDER.TITLE,
        type: "text",
      },
      description: {
        name: LABELS.PLACE_HOLDER.DESCRIPTION,
        type: "text",
      },
      orgName: {
        name: LABELS.PLACE_HOLDER.AWARDED_BY,
        type: "text",
      },
    },
  },
  certifications: {
    type: "array",
    fields: {
      examCode: {
        name: LABELS.PLACE_HOLDER.CERT_EXAM_CODE,
        type: "text",
      },
      examTitle: {
        name: LABELS.PLACE_HOLDER.TITLE,
        type: "text",
      },
      orgName: {
        name: LABELS.PLACE_HOLDER.CERT_ORG_NAME,
        type: "text",
      },
    },
  },
  groupsMembereds: {
    type: "array",
    fields: {
      description: {
        name: LABELS.PLACE_HOLDER.DESCRIPTION,
        type: "text",
      },
      title: {
        name: LABELS.PLACE_HOLDER.TITLE,
        type: "text",
      },
      url: {
        name: LABELS.PLACE_HOLDER.GROUPS_MEMBERED_URL,
        type: "text",
      },
    },
  },
  patents: {
    type: "array",
    fields: {
      description: {
        name: LABELS.PLACE_HOLDER.DESCRIPTION,
        type: "text",
      },
      title: {
        name: LABELS.PLACE_HOLDER.TITLE,
        type: "text",
      },
      url: {
        name: LABELS.PLACE_HOLDER.PATENT_URL,
        type: "text",
      },
    },
  },
  publications: {
    type: "array",
    fields: {
      description: {
        name: LABELS.PLACE_HOLDER.DESCRIPTION,
        type: "text",
      },
      title: {
        name: LABELS.PLACE_HOLDER.TITLE,
        type: "text",
      },
      url: {
        name: LABELS.PLACE_HOLDER.PUBLICATIONS_URL,
        type: "text",
      },
    },
  },
  socialLinks: {
    facebookURL: {
      name: LABELS.PLACE_HOLDER.FACEBOOK,
      type: "text",
    },
    linkedInURL: {
      name: LABELS.PLACE_HOLDER.LINKEDIN,
      type: "text",
    },
    personalWebURL: {
      name: LABELS.PLACE_HOLDER.PERSONAL,
      type: "text",
    },
    twitterURL: {
      name: LABELS.PLACE_HOLDER.TWITTER,
      type: "text",
    },
  },
  veteranServices: {
    type: "array",
    fields: {
      branch: {
        name: LABELS.PLACE_HOLDER.VETERAN_SERVICE_BRANCH,
        type: "text",
      },
      description: {
        name: LABELS.PLACE_HOLDER.DESCRIPTION,
        type: "text",
      },
      rank: {
        name: LABELS.PLACE_HOLDER.VETERAN_SERVICE_RANK,
        type: "text",
      },
      recommendations: {
        name: LABELS.PLACE_HOLDER.VETERAN_SERVICE_RECOMMENDATION,
        type: "text",
      },
    },
  },
};
