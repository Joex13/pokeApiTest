/**
 * エラーメッセージを表示するHTML要素を作成する関数
 * @param {string} message エラーメッセージ
 * @return {HTMLElement} DocumentFragmentオブジェクト
 */
export const createErrorElement = (message) => {
  const templateElement = document.createElement('div');
  const messageElement = `<p id="error-message" class="error-message">${message}</p>`;
  templateElement.innerHTML = messageElement;

  return templateElement.children[0];
};

/**
 * 複数のHTML要素を作成する関数
 * @param {string} htmlString HTML要素の文字列
 * @returns {DocumentFragment} DocumentFragmentオブジェクト
 */
export const createElements = (htmlString) => {
  const templateElement = document.createElement('div');
  templateElement.innerHTML = htmlString;

  const documentFragment = document.createDocumentFragment();
  for (const node of Array.from(templateElement.childNodes)) {
    documentFragment.appendChild(node);
  }

  return documentFragment;
};