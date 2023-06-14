// require('child_process').exec(`start http://localhost:19200/test.html`);

// 设置环境变量

// 唯一端口号
process.env.PORT = 19200;

// process.env.token = "/test.html";
process.env.limit = 3;
process.env.throttle = true;

// 一对一
process.env.one2one = true;

// 自启动脚本池，以"UE5_"开头
const ueProjectName = "EmptyProject";
process.env.UE5_GPU_0 = getUEProcess(ueProjectName, 0, 0);
process.env.UE5_GPU_1 = getUEProcess(ueProjectName, 0, 1);
process.env.UE5_GPU_2 = getUEProcess(ueProjectName, 0, 2);

// 预加载1个空闲的UE5进程
// process.env.preload = 1;

// process.env.UE5_10_0_42_16 = 'curl http://10.0.42.16/RUN-UE5'

// TURN服务

const TURNCONFIG = {
	useturn : true,
	turnPort : 19201,
	turnPublicIP : "??.??.???.???",
    turnLocalIP : "192.168.10.126",
	userName : `"yskj"`,
	credential : `"yskj123"`,
}

if (TURNCONFIG.useturn) {
    require('child_process').exec(getTurnServer());
}

function getUEProcess(projectName = "DEFAULT", gpuIndex = 0, instanceIndex = 0, reslutionX = 1920, reslutionY = 1080, showLog = true) {
    var uePARAM = [
        " -Unattended",
        " -RenderOffScreen",
        " -PixelStreamingURL=ws://127.0.0.1:" + process.env.PORT + "/",
        " -GraphicsAdapter=" + gpuIndex,
        " -ProjectID=GPU_" + instanceIndex,
        " -ForceRes",
        " -ResX=" + reslutionX,
        " -ResY=" + reslutionY,
        " -AllowPixelStreamingCommands",
        showLog ? " -Log" : ""
    ]
    var ueCMD = "start ../" + projectName + ".exe";
    for (i = 0; i < uePARAM.length; i++) {
        ueCMD += uePARAM[i];
    }
    return ueCMD;
}

function getTurnServer() {
    var turnCMD = "start ./coturn/turnserver.exe";
    var turnPARAM = [
        " -p " + TURNCONFIG.turnPort,
        ` -r "PixelStreaming"`,
        " -X " + `"` + TURNCONFIG.turnPublicIP + `"`,
        " -L " + `"` + TURNCONFIG.turnLocalIP + `"`,
        " -E " + `"` + TURNCONFIG.turnLocalIP + `"`,
        ` --no-cli --no-tls --no-dtls --pidfile "C:\\coturn.pid" -f -a -v -n`,
        " -u " + TURNCONFIG.userName + ":" + TURNCONFIG.credential
    ];
    for (i = 0; i < turnPARAM.length; i++) {
        turnCMD += turnPARAM[i];
    }
    return turnCMD;
}

require("./signal.js");

