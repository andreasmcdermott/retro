export const gotoNewBoard = (newPage = false) => {
  if (newPage) window.open(`${location.origin}/b`, "_blank");
  else history.pushState({}, "", `/b`);
};

export const gotoBoard = (boardId: string, replace = false) => {
  if (replace) history.replaceState({}, "", `/b/${boardId}`);
  else history.pushState({}, "", `/b/${boardId}`);
};

export const setLastBoardId = (boardId: string) => {
  localStorage.setItem("lastBoardId", boardId);
};

export const getLastBoardId = () => {
  return localStorage.getItem("lastBoardId");
};
