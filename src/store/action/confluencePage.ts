export const ConfluencePageAction = {
  AddPage: "scrumlr.io/addPage" as const,
  DeletePage: "scrumlr.io/deletePage" as const,
};

export const ConfluencePageActionFactory = {
  addPage: (page: string) => ({
    type: ConfluencePageAction.AddPage,
    page,
  }),
  deletePage: () => ({
    type: ConfluencePageAction.DeletePage,
    page: "",
  }),
};

export type ConfluencePageReduxAction = ReturnType<typeof ConfluencePageActionFactory.addPage> | ReturnType<typeof ConfluencePageActionFactory.deletePage>;
