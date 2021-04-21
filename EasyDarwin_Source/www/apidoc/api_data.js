define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/players",
    "title": "获取拉流列表",
    "group": "stats",
    "name": "Players",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start",
            "description": "<p>分页开始,从零开始</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>分页大小</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "ascending",
              "descending"
            ],
            "optional": true,
            "field": "order",
            "description": "<p>排序顺序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "q",
            "description": "<p>查询参数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总数</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "rows",
            "description": "<p>推流列表</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.id",
            "description": ""
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.path",
            "description": ""
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.transType",
            "description": "<p>传输模式</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "rows.inBytes",
            "description": "<p>入口流量</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "rows.outBytes",
            "description": "<p>出口流量</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.startAt",
            "description": "<p>开始时间</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/stats.go",
    "groupTitle": "查询接口"
  },
  {
    "type": "get",
    "url": "/api/v1/pushers",
    "title": "获取推流列表",
    "group": "stats",
    "name": "Pushers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start",
            "description": "<p>分页开始,从零开始</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>分页大小</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "ascending",
              "descending"
            ],
            "optional": true,
            "field": "order",
            "description": "<p>排序顺序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "q",
            "description": "<p>查询参数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总数</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "rows",
            "description": "<p>推流列表</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.id",
            "description": ""
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.path",
            "description": ""
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.transType",
            "description": "<p>传输模式</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "rows.inBytes",
            "description": "<p>入口流量</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "rows.outBytes",
            "description": "<p>出口流量</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "rows.startAt",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "rows.onlines",
            "description": "<p>在线人数</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/stats.go",
    "groupTitle": "查询接口"
  },
  {
    "type": "get",
    "url": "/getserverinfo",
    "title": "获取平台运行信息",
    "group": "sys",
    "name": "GetServerInfo",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Hardware",
            "description": "<p>硬件信息</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "RunningTime",
            "description": "<p>运行时间</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "StartUpTime",
            "description": "<p>启动时间</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Server",
            "description": "<p>软件信息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/sys.go",
    "groupTitle": "API接口"
  },
  {
    "type": "get",
    "url": "/login",
    "title": "登录",
    "group": "sys",
    "name": "Login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码(经过md5加密,32位长度,不带中划线,不区分大小写)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功",
          "content": "HTTP/1.1 200 OK\nSet-Cookie: token=s%3ArkyMbQE0M.5AKAOXbW8c7iP%2BOo0venPkCYiEiPK9FY31mB6AlFQak;//用着后续接口调用的 token",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/sys.go",
    "groupTitle": "API接口"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "登出",
    "group": "sys",
    "name": "Logout",
    "version": "0.0.0",
    "filename": "routers/sys.go",
    "groupTitle": "API接口",
    "success": {
      "examples": [
        {
          "title": "成功",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/restart",
    "title": "重启服务",
    "group": "sys",
    "name": "Restart",
    "version": "0.0.0",
    "filename": "routers/sys.go",
    "groupTitle": "API接口",
    "success": {
      "examples": [
        {
          "title": "成功",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/userInfo",
    "title": "获取当前登录用户信息",
    "group": "sys",
    "name": "UserInfo",
    "version": "0.0.0",
    "filename": "routers/sys.go",
    "groupTitle": "API接口",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": true,
            "field": "roles",
            "description": "<p>角色列表</p>"
          }
        ]
      }
    }
  }
] });
