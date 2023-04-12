# EasyDarwinGo录像功能发布

EasyDarwin服务器现在使用Go版本实现了。最新的代码提交，已经支持了推流（或者拉流）的同时进行本地存储。

本地存储的原理，是在推流的同时启动ffmpeg作为一路Client来做存储。ffmpeg在demux和mux的工作方面已经十分成熟，我们没必要再重复发明轮子。因此这种做法十分取巧而且简单有效，也不会侵入原来的代码架构。如下图所示：

![](./images/20230412134409.png)

RTSP摄像机
EasyDarwin
本地存储
推流
使用ffmpeg进行拉流和存储
RTSP摄像机
EasyDarwin
本地存储

使用方法如下：

**安装ffmpeg。**

EasyDarwin使用Ffmpeg进行本地存储，所以首先需要安装ffmpeg才能继续。可在ffmpeg官方下载链接选择适当的平台来下载。

![](./images/2018111715312161.png)

下载完成后，得到一个zip压缩包，解压出来。我解压之后的目录为Downloads/ffmpeg-20180719-9cb3d8f-macos64-shared/

**配置存储**

EasyDarwin的配置文件，默认为与可执行文件同目录的EasyDarwin.ini文件。EasyDarwin也支持使用用户指定的配置文件，这样很方便在调试环境和生产环境来切换。自定义配置文件如何配置，参考我的另一篇文章的说明。

我们使用文本编辑器打开EasyDarwin.ini，内容如下：

```
[http]
port=10008
default_username=admin
default_password=admin

[rtsp]
port=554

; rtsp 超时时间，包括RTSP建立连接与数据收发。
timeout=28800

; 是否使能gop cache。如果使能，服务器会缓存最后一个I帧以及其后的非I帧，以提高播放速度。但是可能在高并发的情况下带来内存压力。
gop_cache_enable=1

; 是否使能推送的同事进行本地存储，使能后则可以进行录像查询与回放。
save_stream_to_local=1

;easydarwin使用ffmpeg工具来进行存储。这里表示ffmpeg的可执行程序的路径
ffmpeg_path=/Users/ze/Downloads/ffmpeg-20180719-9cb3d8f-macos64-shared/bin/ffmpeg

;本地存储所将要保存的根目录。如果不存在，程序会尝试创建该目录。
m3u8_dir_path=/Users/ze/Downloads/EasyDarwinGoM3u8

;切片文件时长。本地存储时，将以该时间段为标准来生成ts文件(该时间+一个I帧间隔)，单位秒
ts_duration_second=6

;ffmpeg转码格式，比如可设置为-c:v copy -c:a copy，表示copy源格式；default表示使用ffmpeg内置的输出格式，可能需要转码
/265=default
```

其中，rtsp小结里面，有如下几项是事关存储的，我们要做些修改：

1. save_stream_to_local表示是否开启本地存储。1表示开启，0表示不开启。我们改成1即可
2. ffmpeg_path表示ffmpeg的可执行文件的路径。即上一步从ffmpeg下载安装后的路径，如我的mac上的路径为/Users/apple/Downloads/ffmpeg-20180719-9cb3d8f-macos64-shared/bin/ffmpeg
3. m3u8_dir_path表示录像文件的存储目录。设置为一个存在的可读可写目录即可。比如我设置为/Users/apple/Downloads/EasyDarwinGoM3u8
4. 启动EasyDarwin服务，可看到有这样一句[EasyDarwin] 2018/11/17 12:45:35 rtsp-server.go:67: Prepare to save stream to local....输出日志，表示配置本地存储成功。

**测试验证**
EasyDarwinGo支持直接推流和拉流分发，这两种方式都可以用来验证存储功能。

**直接推流**
对于直接推流方式，我们可以安装一个手机端的EasyPusher来方便地测试推送(EasyPusher是手机端的一个RTSP推流器，详见：https://github.com/EasyDarwin/EasyPusher)。

1. 我们设置EasyPusher端的推流地址为EasyDarwin的服务器地址，服务器地址一般为RTSP://SERVER_IP 这里使用了RTSP协议的默认端口554。如果不是很清楚服务器IP，可以在服务器的打印日志里面看到，如下：
   rtsp server start --> rtsp://192.168.0.108
   EasyPusher的推流地址设置为：

![](./images/20181117150604123.png)

2. 确保手机端和服务器端在同一个网络下，我们启动手机端EasyPusher的推送。推送成功后，服务器端会自动启动存储。

**拉流分发**

EasyDarwin可将第三方RTSP视频源拉到服务端并转发出去。这个过程我们成为拉流分发,可以通过下面的方法建立一个拉流：

1. 在打开EasyDarwin管理后台,管理后台的URL默认为http://[服务器地址]:10008,其中端口可在配置文件里面HTTP小节里做修改。
   后台管理界面如下：

   ![](./images/20190106173357490.png)

2. 点击“拉流分发”按钮，添加一个拉流，界面如下：

![](./images/20190106173810387.png)

这里有四个参数可设置

- RTSP地址，即拉流地址，就是要拉流的第三方的RTSP视频源地址

- 自定义路径，这个是为了给拉流地址创建个在本服务器对应的地址。如果不填，那默认地址为RTSP://[服务器地址]/[第三方RTSP源的PATH]，比如如果拉流地址为RTSP://user:password@xx.xx.xx.xx:port/1/2/3.sdp,那本地服务器的对应地址就应该为RTSP://[服务器地址]/1/2/3.sdp.
- 可想而知，如果本地服务器已经有了一个RTSP://[服务器地址]/1/2/3.sdp这样的流，就有冲突了。这个自定义路径就是为了解决这个冲突的。自定义路径设置了后，本地地址则变成了RTSP://[服务器地址]/自定义路径
- 空闲超时，拉流的超时时间，当拉流时，从视频源接收数据，当超过空闲超时时间却没有受到任何数据时，视为RTSP超时，会断开拉流。如果不填，则使用配置文件里面RTSP小节的timeout字段
- 心跳间隔，EasyDarwin拉流时，会定期给视频源发送心跳包用来保活。这里的心跳包就是指OPTIONS命令

我们按照下图的输入内容创建一个拉流

![](./images/20190106180312399.png)

可以在列表看到新增加了一条记录：

![](./images/20190106182650240.png)

这里的上行流量就是从视频源拉流的流量总数；注意看这里有个在线人数为1，这里表示观看的用户数为一。这个观看用户数实际上就是ffmpeg在做存储。

3. 等过段时间后，我们打开存储目录，可看到上面两个测试验证生成的文件目录，如下图所示：

![](./images/20190106183018211.png)

可以看到生成了一些ts文件和一个m3u8文件。m3u8可在浏览器的video标签进行播放。

**回放和直播**

可通过接口获取到录像生成的文件地址，接口如下：

```
// 查询录像文件夹
GET /api/v1/record/folders
// 响应：
{
	"total": 2,
	"rows": [
		{
		"folder": "439622.sdp"
		},
		{
		"folder": "stream_265"
		}
	]
}
```

```
// 查询录像文件夹下面的文件
GET /api/v1/record/files?folder=stream_265
// 响应：
{
	"total": 18,
	"rows": [
		{
			"duration": "",
			"durationMillis": 0,
			"path": "/stream_265/20190106/out.m3u8"
		},
		{
			"duration": "00:00:10.00",
			"durationMillis": 10000,
			"path": "/stream_265/20190106/out0.ts"
		}
		...
	]
}
```

查询到的结果通过拼接合成全路径如下，这个路径便可进行回放。

```
http://[服务器地址]:10008/record/stream_265/20190106/out0.ts
```
如果需要直播，那使用m3u8文件路径，如下：

```
http://[服务器地址]:10008/record/stream_265/20190106/out.m3u8
```
存储文件的播放兼容性处理以及自定义配置
有些流保存成m3u8后，无法在浏览器直接播放，比如H265的流。这时候就需要转码了。ffmpeg提供的转码功能可解决这个问题。
EasyDarwin在存储时，相当于调用ffmpeg指令如下：
```
ffmpeg -fflags genpts -rtsp_transport tcp -i rtsp://localhost:554/stream_265 -c:v copy -c:a copy -hls_time 6 -hls_list_size 0 /Users/ze/Downloads/EasyDarwinGoM3u8/stream_265/20190106/out.m3u8
```
注意这里的-c:v和-c:a参数使用了copy，相当于没有转码。当需要转码时，我们把这两个字段去掉就可以了。
方法是在配置文件里面的rtsp小节，加上一个配置项，key为拉流的自定义路径，值为default,如下所示：
```
;ffmpeg转码格式，比如可设置为-c:v copy -c:a copy，表示copy源格式；default表示使用ffmpeg内置的输出格式，可能需要转码
/stream_265=default
```
这时，再进行存储，ffmpeg的指令变为：
```
ffmpeg -fflags genpts -rtsp_transport tcp -i rtsp://localhost:554/stream_265 -hls_time 6 -hls_list_size 0 /Users/ze/Downloads/EasyDarwinGoM3u8/stream_265/20190106/out.m3u8
```
去掉了-c:v copy -c:a copy字段，ffmpeg存储时就开始转码了。这样会提高了存储文件的兼容性，但是同时会提高cpu的占用率。

至此，EasyDarwin的录像存储功能已经给大家介绍完了。EasyDarwin是一款开源的RTSP流媒体服务器。我们后续将会持续迭代，增加一些有趣的功能，比如录像查询与回放等等。欢迎大家关注和使用，地址：https://github.com/EasyDarwin/EasyDarwin

————————————————

版权声明：本文为CSDN博主「「已注销」」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。

原文链接：https://blog.csdn.net/jyt0551/article/details/84189498