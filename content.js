function createCard(selectedText, url, title) {
    try {
        // 移除已存在的卡片
        if (document.getElementById('shareCard')) {
            document.getElementById('shareCard').remove();
        }

        // 创建卡片容器
        const card = document.createElement('div');
        card.id = 'shareCard';
        card.style.cssText = `
            position: fixed;
            inset-block-start: 50%;
            inset-inline-start: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-inline-size: 400px;
            inline-size: 90%;
            animation: fadeIn 0.3s ease-out;
        `;

        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -48%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
        `;
        document.head.appendChild(style);

        // 关闭按钮
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.cssText = `
            position: absolute;
            inset-block-start: 12px;
            inset-inline-end: 12px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 18px;
            color: #666;
            padding: 4px 8px;
            border-radius: 4px;
        `;
        closeButton.onclick = () => card.remove();
        card.appendChild(closeButton);

        // 选中的文字
        const text = document.createElement('p');
        text.textContent = `"${selectedText}"`;
        text.style.cssText = `
            margin: 0 0 16px 0;
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            border-inline-start: 4px solid #2196F3;
            padding-inline-start: 12px;
        `;
        card.appendChild(text);

        // 标题
        const titleDisplay = document.createElement('div');
        titleDisplay.textContent = title;
        titleDisplay.style.cssText = `
            font-weight: 600;
            color: #1a73e8;
            font-size: 14px;
            margin-block-end: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `;
        card.appendChild(titleDisplay);

        // URL显示和复制按钮容器
        const urlContainer = document.createElement('div');
        urlContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #f8f9fa;
            padding: 8px 12px;
            border-radius: 6px;
        `;

        const urlDisplay = document.createElement('div');
        urlDisplay.textContent = url;
        urlDisplay.style.cssText = `
            color: #666;
            font-size: 13px;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `;

        const copyButton = document.createElement('button');
        copyButton.textContent = "复制链接";
        copyButton.style.cssText = `
            border: none;
            background-color: #2196F3;
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            transition: background-color 0.2s;
        `;

        copyButton.onclick = async () => {
            try {
                await navigator.clipboard.writeText(url);
                const originalText = copyButton.textContent;
                copyButton.textContent = "已复制！";
                copyButton.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.style.backgroundColor = '#2196F3';
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制');
            }
        };

        urlContainer.appendChild(urlDisplay);
        urlContainer.appendChild(copyButton);
        card.appendChild(urlContainer);

        // 添加卡片到页面
        document.body.appendChild(card);

    } catch (error) {
        console.error('[分享卡片] 错误:', error);
        alert('生成分享卡片失败: ' + error.message);
    }
}