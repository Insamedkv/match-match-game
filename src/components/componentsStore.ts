export async function components() {
  return Promise.all([
    import('./headerComponent/header').then((module) => module.HeaderComponent),
    import('./contentComponent/content').then((module) => module.ContentComponent),
    import('./aboutComponent/about').then((module) => module.AboutComponent),
    import('./scoreComponent/score').then((module) => module.ScoreComponent),
    import('./dialogComponent/dialog').then((module) => module.DialogComponent),
    import('./settingComponent/setting').then((module) => module.SettingComponent),
    import('./cardComponent/card').then((module) => module.CardComponent),
    import('./gameAreaComponent/gameArea').then((module) => module.GameAreaComponent),
    import('./userComponent/user').then((module) => module.UserComponent),
  ]);
}
