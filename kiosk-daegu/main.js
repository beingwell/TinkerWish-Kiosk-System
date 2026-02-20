const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreen: true,       // 실행 시 전체화면
        autoHideMenuBar: true,  // 메뉴바 숨김
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

// [핵심] 여기서 실제로 CSV 파일을 생성하고 저장합니다.
ipcMain.on('save-to-csv', (event, data) => {
    // 저장 경로: .exe 파일이 있는 같은 폴더에 생성됨
    const filePath = path.join(process.cwd(), 'tinkerwish-regist.csv');
    
    // 한글 깨짐 방지(BOM)와 데이터 한 줄 생성
    const csvLine = `${data.name},${data.phone},${new Date().toLocaleString()}\n`;
    
    // 파일이 없으면 제목(헤더)부터 쓰고, 있으면 내용만 추가함
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '\uFEFF이름,전화번호,등록시간\n', 'utf8');
    }
    fs.appendFileSync(filePath, csvLine, 'utf8');
});

ipcMain.on('print-silent', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    
    win.webContents.print({
        silent: true,
        printBackground: true,
        deviceName: '', // 기본 프린터 사용
        margins: { marginType: 'none' },
        pageSize: {
            width: 72000,
            height: 297000
        }
    }, (success, failureReason) => {
        // 인쇄 결과에 따른 처리
        if (!success) {
            // 인쇄 실패 시 경고창 띄우기
            dialog.showMessageBox(win, {
                type: 'error',
                title: '인쇄 오류',
                message: '영수증 인쇄에 실패했습니다.',
                detail: `원인: ${failureReason}\n프린터 연결 상태와 용지를 확인해 주세요.`,
                buttons: ['확인']
            });
        }
    });
});


app.whenReady().then(createWindow);