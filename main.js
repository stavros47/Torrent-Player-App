const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const shell = require('electron').shell;
// const ipc = require('electron').ipcMain;
// const server = require('./server');


// function generateAddWindow(){
//   const modalPath = path.join('file://', __dirname, './src/add.html');
//   let wind = new BrowserWindow({
//           frame: true,
//           alwaysOnTop:true,
//           width: 400,
//           height: 200
//       });
//   wind.on('close', function(){ win = null;});
//   wind.loadURL(modalPath);
//   wind.show();
// }
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadFile('src/index.html')
  
    // Open the DevTools.
    //win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })


    var menu = Menu.buildFromTemplate([
        {    
                label: 'Menu',
                submenu: [
                    {
                      label: 'Settings',
                      click(){
                       //Create Settings window
                      }
                    },
                    {
                      label: 'GitHub',
                      click() {
                        shell.openExternal('https://github.com/stavros47/Torrent-Player-App')
                      }
                    },
                    {type: 'separator'},
                    {
                        label: 'Exit',
                        click() {
                            app.quit();
                        }
                    }
                ]
                 
        }    
    ])

    Menu.setApplicationMenu(menu);

  }
  


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // ipc.on('update-notify-value', (event,arg) => {
  //   win.webContents.send('targetPriceVal', arg)
  // })
