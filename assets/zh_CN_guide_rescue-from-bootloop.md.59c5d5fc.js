import{_ as e,o,c as t,a as r}from"./app.1512871b.js";const b=JSON.parse('{"title":"救砖","description":"","frontmatter":{},"headers":[{"level":2,"title":"刷入 boot 变砖","slug":"刷入-boot-变砖","link":"#刷入-boot-变砖","children":[]},{"level":2,"title":"刷入模块变砖","slug":"刷入模块变砖","link":"#刷入模块变砖","children":[{"level":3,"title":"普通模块变砖","slug":"普通模块变砖","link":"#普通模块变砖","children":[]},{"level":3,"title":"格机或其他病毒模块变砖","slug":"格机或其他病毒模块变砖","link":"#格机或其他病毒模块变砖","children":[]}]}],"relativePath":"zh_CN/guide/rescue-from-bootloop.md"}'),a={name:"zh_CN/guide/rescue-from-bootloop.md"},l=r('<h1 id="intruduction" tabindex="-1">救砖 <a class="header-anchor" href="#intruduction" aria-hidden="true">#</a></h1><p>在刷机的时候我们可能会遇到设备“变砖”的情况，理论上讲，如果你只是使用 fastboot 刷入 boot 分区或者安装不合适的模块导致设备无法启动，那么这都可以通过合适的操作恢复手机；本文档旨在提供一些急救方法让你可以在“变砖”中恢复。</p><h2 id="刷入-boot-变砖" tabindex="-1">刷入 boot 变砖 <a class="header-anchor" href="#刷入-boot-变砖" aria-hidden="true">#</a></h2><p>在 KernelSU 中，刷入 boot 变砖有如下可能：</p><ol><li>你刷入了错误格式的 boot 镜像。比如你的手机 boot 格式是 <code>gz</code> 的，但你刷入了 <code>lz4</code> 格式的镜像，那么此时手机无法启动。</li><li>你的手机需要关闭 avb 验证才能正常启动（注意这通常意味着需要清除手机所有数据）。</li><li>你的 kernel 有某些 bug 或者你的 kernel 不适合你这个手机刷入。</li></ol><p>无论哪种情况，你都可以通过<strong>刷入原厂 boot</strong>恢复；因此，在安装教程最开始，我们已经强烈建议大家，在刷机之前备份自己的原厂 boot！如果你没有备份，那么你可以通过其他跟你相同设备的童鞋或者官方固件包获取原厂 boot。</p><h2 id="刷入模块变砖" tabindex="-1">刷入模块变砖 <a class="header-anchor" href="#刷入模块变砖" aria-hidden="true">#</a></h2><p>刷入模块变砖可能是大家遇到更常见的情况，但是这里必须郑重告诉大家：<strong>请勿刷入来路不明的模块！！</strong>。因为模块其实是有 root 权限的，它完全可能导致你的设备发生不可逆的损坏！</p><h3 id="普通模块变砖" tabindex="-1">普通模块变砖 <a class="header-anchor" href="#普通模块变砖" aria-hidden="true">#</a></h3><p>如果大家刷入某些开源的或者被证明是安全的模块使得手机无法启动，那么这种情况在 KernelSU 中非常容易恢复，完全无需担心。KernelSU 内置了如下两种机制来救砖：</p><ol><li>AB 更新</li><li>音量键救砖</li></ol><h4 id="ab-update" tabindex="-1">AB 更新 <a class="header-anchor" href="#ab-update" aria-hidden="true">#</a></h4><p>KernelSU 的模块更新借鉴了 Android 系统 OTA 更新时的 AB 更新机制，如果你安装了新模块或者对已有模块有更新操作，不会直接操作当前使用的模块文件，而是会把所有模块构建成另外一个 update 镜像；系统重启之后，会使用这个 update 镜像尝试启动一次，如果 Android 系统成功启动，才会真正更新模块。</p><p>因此，最简单最常用的救砖方法就是：<strong>强制重启一次</strong>。如果你在刷某个模块之后系统无法启动，你可以长按电源键超过 10 秒，系统会自动重启；重启之后会回滚到更新模块之前的状态，之前更新的模块会被自动禁用。</p><h4 id="volume-down" tabindex="-1">音量键救砖 <a class="header-anchor" href="#volume-down" aria-hidden="true">#</a></h4><p>如果 AB 更新依然无法解决，你可以尝试使用<strong>安全模式</strong>。进入安全模式之后，所有的模块都会被禁用。</p><p>进入安全模式的方法有两种：</p><ol><li>某些系统自带的安全模式；有些系统是长按音量下，有些系统（比如MIUI）可以在 Recovery 中开启安全模式。进入系统的安全模式后，KernelSU 也会进入安全模式，自动禁用模块。</li><li>KernelSU 内置的安全模式；操作方法：开机第一屏后，<strong>连续按音量下键超过三次</strong>。注意是按下-松开、按下-松开、按下-松开，不是按着不动。</li></ol><p>进入安全模式以后，KernelSU 管理器的模块页面所有模块都被禁用，但你可以执行“卸载”操作，卸载可能会有问题的模块。</p><p>内置的安全模式是在内核里面实现的，因此不会出现按键事件被拦截导致捕获不到的情况。不过对于非 GKI 内核，可能需要手动集成代码，可以参考官网教程。</p><h3 id="格机或其他病毒模块变砖" tabindex="-1">格机或其他病毒模块变砖 <a class="header-anchor" href="#格机或其他病毒模块变砖" aria-hidden="true">#</a></h3><p>如果以上方法无法拯救你的设备，那么很有可能你装的模块有恶意操作或者通过其他方式损坏了你的设备，这种情况下，只有两个建议：</p><ol><li>清除数据后刷入完整刷入官方系统。</li><li>咨询售后服务。</li></ol>',23),i=[l];function n(d,h,s,c,p,u){return o(),t("div",null,i)}const g=e(a,[["render",n]]);export{b as __pageData,g as default};
