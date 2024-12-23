chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createShareCard", // 菜单项的唯一ID
        title: "生成分享卡片", // 菜单项的显示文本
        contexts: ["page", "selection", "link", "image"], // 菜单项出现的上下文，例如页面、选中文本、链接、图片等
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "createShareCard" && info.selectionText && tab) {
        console.log("右键菜单点击事件", info);
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: (selectedText, url, title) => {
                    window.createCard(selectedText, url, title);
                },
                args: [info.selectionText, tab.url, tab.title]
            });
        } catch (error) {
            console.error("执行脚本出错:", error);
        }
    }
});