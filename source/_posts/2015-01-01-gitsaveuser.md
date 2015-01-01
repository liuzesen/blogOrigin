title: 存储git账号密码
date: 2015-01-01 21:49:33
categories:
- 小技巧
tags:
- git
---
如何存储git账号密码
==================
每一次运行git的时候，但凡到pull、push和clone等操作都要输入账号密码，非常的麻烦，今天整理一下如何设置跳过这一步。
默认你已经安装了git。

第一步  在任意目录下创建*.git-credentials*文件时，由于window不能创建.开头的文件，所以要借住cmd命令来创建，方式有很多，我使用了以下的方式：
```cmd
echo a 2>.git-credentials
```
还有一种如下：
首先鼠标右键创建一个*git-credentials*文件，注意无后缀名；
然后执行``mv git-credentials .git-credentials``。
当然还有很多很多其它的方法。

第二步  根据以下格式输入你的github账号密码：
```cmd
https:/{/git用户名}:{git密码}@github.com
```

第三步  执行以下命令
```cmd
git config --global credential.helper store
```
当前文件多了一个文件.*gitconfig*文件，看到里面有如下文字就表示成功：
```cmd
[credential]
	helper = store
```

最后 提示一下，如果有还使用其它的git库，例如oschina.git的话。你在第一次输入账号密码后就会被记住，以后也不需要再输入了。

参考文档
-------
[gitcredentials](https://www.kernel.org/pub/software/scm/git/docs/v1.7.9/gitcredentials.html)
[git-credential-store](https://www.kernel.org/pub/software/scm/git/docs/v1.7.9/git-credential-store.html)
