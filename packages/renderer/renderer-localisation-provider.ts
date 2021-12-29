export const geti18NMessages = async (
  localeFileName: string,
): Promise<Object> => {
  return await Promise.all([
    import("@atlaskit/renderer/dist/es2019/i18n/uk.js"),
    import("@atlaskit/mention/dist/es2019/i18n/en"),
  ]).then((args) =>
    args.reduce((acc, current) => ({ ...acc, ...current.default }), {}),
  );
};
