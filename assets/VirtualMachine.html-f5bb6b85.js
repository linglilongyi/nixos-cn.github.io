import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-533af08c.js";const t="/images/GreenHand/EnableUefi.webp",i="/images/GreenHand/VmResAllocation.webp",p="/images/GreenHand/VmNet.webp",o="/images/GreenHand/FirstEncounterWithTty.webp",c="/images/GreenHand/Efivars.webp",l="/images/GreenHand/CheckNet.webp",r="/images/GreenHand/RebuildSystem.webp",d="/images/GreenHand/Lsblk.webp",u="/images/GreenHand/HardwareConfig.webp",m="/images/GreenHand/HelloKde.webp",v={},b=e('<h1 id="虚拟机安装" tabindex="-1"><a class="header-anchor" href="#虚拟机安装" aria-hidden="true">#</a> 虚拟机安装</h1><p>无论你使用什么虚拟机安装，过程都是大同小异的。需要注意的是 HyperV 的安全启动是默认开启的，需要你手动关掉。</p><p>以下教程是基于 UEFI 的安装，所以还需要你启用 VMWARE 的 UEFI 选项（如果你真的使用 VMWARE 的话）。</p><figure><img src="'+t+'" alt="启用 UEFI" tabindex="0" loading="lazy"><figcaption>启用 UEFI</figcaption></figure><h2 id="创建虚拟机" tabindex="-1"><a class="header-anchor" href="#创建虚拟机" aria-hidden="true">#</a> 创建虚拟机</h2><p>虚拟机的资源大小取决于你的应用，这个教程仅为新手提供一种基本系统的安装方法，更加高阶的个性化教程会在额外的章节提及。</p><p>本文使用创建的虚拟机的内存为 8GB，硬盘为 32GB 大小。如果你的计算机资源不够，理论上是可以尝试开辟更小的资源。</p><figure><img src="'+i+'" alt="资源分配" tabindex="0" loading="lazy"><figcaption>资源分配</figcaption></figure><h2 id="检查虚拟网络" tabindex="-1"><a class="header-anchor" href="#检查虚拟网络" aria-hidden="true">#</a> 检查虚拟网络</h2><p>部分 VMWARE 用户会遇到网络无法连接到宿主机网络的问题，可能是虚拟网络未配置导致的，推荐下面的 NAT 配置：</p><figure><img src="'+p+'" alt="虚拟网络" tabindex="0" loading="lazy"><figcaption>虚拟网络</figcaption></figure><p>如果你看到图上的按钮和文本框大多为灰色并无法修改，记得点击右下角的 UAC 蓝色盾牌以修改设置。HyperV 的虚拟交换机保持默认设置就好，一般而言没有那么容易出问题。</p><h2 id="检查-uefi-变量" tabindex="-1"><a class="header-anchor" href="#检查-uefi-变量" aria-hidden="true">#</a> 检查 UEFI 变量</h2><p>然后假设你如愿开机进入 Live CD 了：</p><figure><img src="'+o+`" alt="与 TTY 相遇" tabindex="0" loading="lazy"><figcaption>与 TTY 相遇</figcaption></figure><p>为了防止分区的时候遇到麻烦，还是先验证一下 UEFI 是否真正启用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> /sys/firmware/efi/efivars  <span class="token comment"># 列出 EFI 变量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+c+`" alt="EFI 变量" tabindex="0" loading="lazy"><figcaption>EFI 变量</figcaption></figure><h2 id="检查网络" tabindex="-1"><a class="header-anchor" href="#检查网络" aria-hidden="true">#</a> 检查网络</h2><p>随便 Ping 几个主机：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ping</span> www.baidu.com <span class="token parameter variable">-c</span> <span class="token number">4</span>
<span class="token function">ping</span> <span class="token number">119.29</span>.29.29 <span class="token parameter variable">-c</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果域名不可及而 IP 可以访问，则优先检查 DNS 服务器配置。</p><figure><img src="`+l+`" alt="Ping" tabindex="0" loading="lazy"><figcaption>Ping</figcaption></figure><h2 id="更换镜像频道" tabindex="-1"><a class="header-anchor" href="#更换镜像频道" aria-hidden="true">#</a> 更换镜像频道</h2><p>频道类似一种获取软件源码包的软件源。</p><p>由于未知原因大陆访问远洋主机有点困难，还是用镜像服务器吧：</p><div class="hint-container warning"><p class="hint-container-title">注意系统版本</p><p>截至笔者截稿，NixOS 当前最新版本为 23.05，遂命令也是针对这个版本而生效的，更新的版本请注意替换命令中的<mark>系统版本号</mark>。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token parameter variable">-i</span>
nix-channel <span class="token parameter variable">--add</span> https://mirrors.ustc.edu.cn/nix-channels/nixpkgs-unstable nixpkgs  <span class="token comment"># 订阅镜像仓库频道</span>
nix-channel <span class="token parameter variable">--add</span> https://mirrors.ustc.edu.cn/nix-channels/nixos-23.05 nixos  <span class="token comment"># 请注意系统版本</span>
nix-channel <span class="token parameter variable">--list</span>  <span class="token comment"># 列出频道，这一步是确认修改没有出错</span>
nix-channel <span class="token parameter variable">--update</span>  <span class="token comment"># 更新并解包频道</span>
nixos-rebuild <span class="token parameter variable">--option</span> substituters https://mirrors.ustc.edu.cn/nix-channels/store switch <span class="token parameter variable">--upgrade</span>  <span class="token comment"># 临时切换二进制缓存源，并更新生成</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出意外就能顺利构建：</p><figure><img src="`+r+`" alt="使配置生效" tabindex="0" loading="lazy"><figcaption>使配置生效</figcaption></figure><h2 id="分区与格式化" tabindex="-1"><a class="header-anchor" href="#分区与格式化" aria-hidden="true">#</a> 分区与格式化</h2><p>查看一下我们要分区的设备：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lsblk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+d+`" alt="块设备" tabindex="0" loading="lazy"><figcaption>块设备</figcaption></figure><p>可以看出 <code>/dev/sda</code> 就是我们要分区的设备。</p><p>接下来进入 <code>parted</code> 的交互模式开始分区，请注意这些修改是实时生效的，所以不需要你操心保存的事。</p><div class="hint-container tip"><p class="hint-container-title">单位问题</p><p>两种单位的计算方法不一致，MB 以 10 为底计算，而 MiB 以 2 为底计算，这也许能解答你对 <code>parted</code> 显示的硬盘时大时小的疑惑。GiB 与 GB 同理。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">parted</span> /dev/sda  <span class="token comment"># 分区该设备</span>
mklabel gpt  <span class="token comment"># 创建 GPT 表</span>
mkpart ESP fat32 1MiB 256MiB  <span class="token comment"># 在 1 MiB - 256 MiB 的位置创建引导分区</span>
p  <span class="token comment"># 打印当前分区表</span>
<span class="token builtin class-name">set</span> <span class="token number">1</span> esp on  <span class="token comment"># 将序号为 1 的分区标识为可启动</span>
mkpart primary 256MiB <span class="token parameter variable">-8GiB</span>  <span class="token comment"># 在自 256MiB 至分区尾前 8GiB 的位置创建主分区</span>
mkpart primary linux-swap <span class="token parameter variable">-8GiB</span> <span class="token number">100</span>%  <span class="token comment"># 余下的 8GiB 用于创建交换分区</span>
p  <span class="token comment"># 确认当前分区情况</span>
quit  <span class="token comment"># 退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">保留 1 MiB</p><p>1 MiB 可以保证分区标识，也就是说，分区的起始扇区包含了分区的类型、大小、位置等信息，这些信息是操作系统识别和加载分区的重要依据，如果这些信息被破坏或覆盖，就会导致分区无法启动或者数据丢失。</p></div><p>以上命令创建的分区有：</p><ul><li>一个引导分区，存放内核和引导</li><li>一个主分区，放置软件，用户数据</li><li>一个交换分区（虚拟内存）</li></ul><p>但是光创建分区还不够，还需要格式化他们：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkfs.fat <span class="token parameter variable">-F</span> <span class="token number">32</span> /dev/sda1  <span class="token comment"># 格式化引导分区为 FAT32 格式</span>
mkfs.btrfs <span class="token parameter variable">-L</span> nixos /dev/sda2  <span class="token comment"># 格式化根分区为 Btrfs 格式</span>
<span class="token function">mkswap</span> <span class="token parameter variable">-L</span> swap /dev/sda3  <span class="token comment"># 设置交换分区</span>
<span class="token function">mount</span> /dev/sda2 /mnt  <span class="token comment"># 将根分区挂载到 /mnt 下</span>
btrfs subvolume create /mnt/root  <span class="token comment"># 创建 root 子卷</span>
btrfs subvolume create /mnt/home  <span class="token comment"># 创建 home 子卷</span>
btrfs subvolume create /mnt/nix  <span class="token comment"># 创建 nix 子卷</span>
<span class="token function">umount</span> /mnt  <span class="token comment"># 取消挂载</span>
<span class="token function">mount</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">compress</span><span class="token operator">=</span>zstd,subvol<span class="token operator">=</span>root /dev/sda2 /mnt  <span class="token comment"># 启用透明压缩参数挂载 root 子卷</span>
<span class="token function">mkdir</span> /mnt/<span class="token punctuation">{</span>home,nix,boot<span class="token punctuation">}</span>  <span class="token comment"># 创建 home，nix，boot 目录</span>
<span class="token function">mount</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">compress</span><span class="token operator">=</span>zstd,subvol<span class="token operator">=</span>home /dev/sda2 /mnt/home  <span class="token comment"># 启用透明压缩参数挂载 home 子卷</span>
<span class="token function">mount</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">compress</span><span class="token operator">=</span>zstd,noatime,subvol<span class="token operator">=</span>nix /dev/sda2 /mnt/nix  <span class="token comment"># 启用透明压缩并不记录时间戳参数挂载 nix 子卷</span>
<span class="token function">mount</span> /dev/sda1 /mnt/boot  <span class="token comment"># 挂载 boot</span>
<span class="token function">swapon</span> /dev/sda3  <span class="token comment"># 启用交换分区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">引导分区</p><p>大多数厂商的主板只认 FAT32 格式的引导分区。</p></div><div class="hint-container tip"><p class="hint-container-title">Btrfs</p><p>Btrfs 是一种比较新颖的文件系统（不提还在冲击内核的 Bcachefs 的话），支持 Cow，校验，快照等特性。划分子卷是为了更好的区分管理。</p></div><p>我们还需要将当前状态生成配置到目标系统中：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nixos-generate-config <span class="token parameter variable">--root</span> /mnt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还需要在默认配置上修改一些内容，才能完成一个粗放的安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /mnt/etc/nixos/configuration.nix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-nix line-numbers-mode" data-ext="nix"><pre class="language-nix"><code><span class="token punctuation">{</span> config<span class="token punctuation">,</span> pkgs<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span>
    imports <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token url">./hardware-configuration.nix</span>
    <span class="token punctuation">]</span>
  boot<span class="token punctuation">.</span>loader<span class="token punctuation">.</span>systemd<span class="token operator">-</span>boot<span class="token punctuation">.</span>enable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  boot<span class="token punctuation">.</span>loader<span class="token punctuation">.</span>efi<span class="token punctuation">.</span>canTouchEfiVariables <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  networking<span class="token punctuation">.</span>networkmanager<span class="token punctuation">.</span>enable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  networking<span class="token punctuation">.</span>hostnName <span class="token operator">=</span> <span class="token string">&quot;nixos&quot;</span><span class="token punctuation">;</span>
  time<span class="token punctuation">.</span>timeZone <span class="token operator">=</span> <span class="token string">&quot;Asia/Shanghai&quot;</span><span class="token punctuation">;</span>
  i18n<span class="token punctuation">.</span>defaultLocale <span class="token operator">=</span> <span class="token string">&quot;en_US.UTF-8&quot;</span><span class="token punctuation">;</span>
  services<span class="token punctuation">.</span>xserver<span class="token punctuation">.</span>enable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  services<span class="token punctuation">.</span>xserver<span class="token punctuation">.</span>displayManager<span class="token punctuation">.</span>sddm <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  services<span class="token punctuation">.</span>xserver<span class="token punctuation">.</span>desktopManager<span class="token punctuation">.</span>plasma5 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  enviroment<span class="token punctuation">.</span>systemPackages <span class="token operator">=</span> <span class="token keyword">with</span> pkgs<span class="token punctuation">;</span> <span class="token punctuation">[</span>
    vim<span class="token punctuation">,</span>
    alacritty
  <span class="token punctuation">]</span><span class="token punctuation">;</span>
  sound<span class="token punctuation">.</span>enable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  hardware<span class="token punctuation">.</span>pulseaudio<span class="token punctuation">.</span>enable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  nix<span class="token punctuation">.</span>settings<span class="token punctuation">.</span>substituters <span class="token operator">=</span> <span class="token punctuation">[</span> 
    <span class="token string">&quot;https://mirrors.cernet.edu.cn/nix-channels/store&quot;</span>
    <span class="token string">&quot;https://mirrors.ustc.edu.cn/nix-channels/store&quot;</span>
    <span class="token string">&quot;https://mirror.sjtu.edu.cn/nix-channels/store&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>
  system<span class="token punctuation">.</span>stateVersion <span class="token operator">=</span> <span class="token string">&quot;23.05&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你肯定在安装 NixOS 之前就了解过它是一个根据配置文件生成系统的发行版，在上面的配置中我们描述了一个带 KDE 桌面的基本系统。</p><p>由于生成配置命令没有写入 Btrfs 子卷的挂载参数，我们需要自己修改另一个配置文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /mnt/etc/nixos/configuration.nix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+u+`" alt="挂载参数" tabindex="0" loading="lazy"><figcaption>挂载参数</figcaption></figure><p>加一些小参数，比如 <code>&quot;compress=zstd&quot;</code> 和 <code>&quot;noatime&quot;</code>，需要注意的是 Nix 的列表语法是用空格分隔元素的。</p><p>然后开始部署系统：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nixos-install <span class="token parameter variable">--option</span> substituters https://mirrors.ustc.edu.cn/nix-channels/store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">缓存缺失</p><p>如果缓存主机缺失某些二进制缓存，带来了冗长的编译环节，可以尝试更换一个 <code>substituter</code>，比如 <code>https://mirror.sjtu.edu.cn/nix-channels/store</code>。</p></div><p>添加用户，<code>tritium</code> 是我的用户名，记得改成你自己的：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nixos-enter  <span class="token comment"># 进入部署好的系统，类似 arch 的 chroot</span>
<span class="token function">passwd</span> root  <span class="token comment"># 重置 root 密码</span>
<span class="token function">useradd</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-G</span> wheel tritium  <span class="token comment"># 添加普通用户，并加入 wheel 组</span>
<span class="token function">passwd</span> tritium  <span class="token comment"># 设置普通账户密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">重置 root 密码</p><p><code>nixos-install</code> 有时候有毒，最后一步的设置密码不生效，所以才会有上面重置 root 密码这步。</p></div><p>然后重启（最好断掉虚拟机的光驱），就能看到安装好的系统了：</p><figure><img src="`+m+'" alt="好久不见，KDE" tabindex="0" loading="lazy"><figcaption>好久不见，KDE</figcaption></figure>',63),k=[b];function g(h,f){return s(),a("div",null,k)}const w=n(v,[["render",g],["__file","VirtualMachine.html.vue"]]);export{w as default};
