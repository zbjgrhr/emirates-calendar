const fs = require('fs');
const path = require('path');
const origin = 'https://uae-holidays-zh-pink-2026-2030.zbjgrhr.chatgpt.site';
const gov = 'https://u.ae/en/information-and-services/public-holidays-and-religious-affairs/public-holidays';
const events = [];
const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{year:'numeric',month:'numeric',day:'numeric',timeZone:'UTC'});
const iso = d => d.toISOString().slice(0,10);
const next = (s,n=1) => iso(new Date(new Date(s+'T00:00:00Z').getTime()+n*86400000));
function add(id,date,name,description,kind='纪念日',days=1,estimated=false,url=gov) {
 events.push({id,date,end:next(date,days),name,description,kind,estimated,url});
}
const fixed = [
 ['new-year','01-01','公历新年','迎接公历新的一年。全国公共假期。','公共假期',1,gov],
 ['children','03-15','阿联酋儿童节','关注儿童的权利、健康、教育和成长；属于纪念日，不另设全国公共假期。','纪念日',1,'https://ecd.gov.ae/en/about-initiative'],
 ['union-pledge','07-18','联邦誓约日','纪念1971年7月18日各酋长国统治者签署联邦宣言与宪法、确定国家名称的历史时刻。不另设全国公共假期。','纪念日',1,'https://mohap.gov.ae/en/w/union-pledge-day-2'],
 ['women','08-28','阿联酋妇女节','致敬阿联酋女性对社会与国家发展的贡献；日期也纪念1975年妇女总会成立。不另设全国公共假期。','纪念日',1,'https://mohap.gov.ae/en/w/emirati-women-s-day'],
 ['flag','11-03','阿联酋国旗日','通过升旗等活动表达对国家团结与共同身份的认同。不另设全国公共假期。','纪念日',1,'https://www.nma.gov.ae/en/media-center/events/flag-day'],
 ['commemoration','11-30','阿联酋烈士纪念日','缅怀为国家奉献生命的人士。按现行全国假期清单，本日为纪念日，不单独列作全国公共假期。','纪念日',1,'https://www.ajnrd.ae/en/event/'],
 ['national','12-02','阿联酋国庆节（联邦日）','纪念1971年12月2日阿联酋联邦成立。全国公共假期为12月2日至3日。','公共假期',2,gov],
 ['year-eve','12-31','跨年夜','公历年最后一天，居民常以聚会、灯光或烟花活动迎接新年。不是全国公共假期；活动以当地公告为准。','节庆',1,gov]
];
for(let y=2026;y<=2030;y++) for(const [id,md,name,desc,kind,days,url] of fixed) add(`${id}-${y}`,`${y}-${md}`,name,desc,kind,days,false,url);
const hijri = [
 [7,27,'miraj','登霄夜','纪念先知穆罕默德夜行与登霄的宗教纪念日。不是全国公共假期。夜间宗教纪念通常自前一日日落开始。','宗教纪念',1],
 [8,15,'haq','哈格莱拉糖果节（舍尔邦月十五夜）','阿联酋传统民俗节庆，孩子们穿传统服装、走访邻里并收集糖果，迎接即将到来的斋月。不是全国公共假期；庆祝活动多在前一晚举行。','传统节庆',1],
 [9,1,'ramadan','斋月开始','伊斯兰历九月开始，穆斯林在黎明至日落间斋戒，重视慈善、反省与家庭团聚。斋月本身不是整月公共假期。','宗教节期',1],
 [9,27,'qadr','盖德尔夜（传统纪念日）','通常在斋月二十七夜纪念，亦常在斋月最后十夜的奇数夜寻求。此日期仅为传统纪念安排，不代表可确定的唯一日期；不是全国公共假期，夜间活动通常从前一日日落开始。','宗教纪念',1],
 [10,1,'fitr','开斋节','庆祝斋月结束，常有节日礼拜、探亲、馈赠和慈善活动。现行全国假期为伊斯兰历十月初一至初三；如斋月满30天，则斋月第30天也放假。未确认的额外一天在日历中单独标明。','公共假期',3],
 [12,9,'arafah','阿拉法特日','伊斯兰历十二月初九，朝觐中的重要日子。全国公共假期一天，随后迎来宰牲节。','公共假期',1],
 [12,10,'adha','宰牲节（古尔邦节）','伊斯兰历十二月初十开始，重视信仰、分享与帮助有需要的人。现行全国公共假期为十二月初十至十二日，共三天。','公共假期',3],
 [1,1,'hijri-new-year','伊斯兰新年','伊斯兰历一月初一，标志新回历年的开始，并纪念迁徙的历史意义。现行全国公共假期一天；实际放假日可能由政府调整。','公共假期',1],
 [3,12,'mawlid','圣纪节（先知穆罕默德诞辰）','伊斯兰历三月十二日，纪念先知穆罕默德诞辰。现行全国公共假期一天；实际放假日可能由政府调整。','公共假期',1]
];
for(let d=new Date('2026-01-01T00:00:00Z');d<new Date('2031-01-01T00:00:00Z');d.setUTCDate(d.getUTCDate()+1)) {
 const p=Object.fromEntries(fmt.formatToParts(d).filter(x=>['year','month','day'].includes(x.type)).map(x=>[x.type,Number(x.value)]));
 for(const [m,day,id,name,desc,kind,days] of hijri) if(p.month===m&&p.day===day) {
  let date=iso(d), estimated=true, url=gov, title=name, detail=desc;
  if(id==='haq') url='https://moc.gov.ae/en/events/haq-al-laila-convoy-tours-the-uae-to-celebrate-the-popular-tradition/';
  if(date.startsWith('2026')) {
   if(id==='fitr') {date='2026-03-20'; estimated=false;url='https://www.timeanddate.com/holidays/united-arab-emirates/2026';}
   if(id==='arafah') {date='2026-05-26';estimated=false;url='https://www.wam.ae/en/article/c09wibx-uae-announces-may-26-29-eid-adha-holiday-for';}
   if(id==='adha') {date='2026-05-27';estimated=false;url='https://www.wam.ae/en/article/c09wibx-uae-announces-may-26-29-eid-adha-holiday-for';}
   if(id==='hijri-new-year') {date='2026-06-15';estimated=false;title='伊斯兰新年假期';detail+=' 2026年实际假期为6月15日；此条记录放假日。';url='https://admobility.gov.ae/en/news/itc-services-during-new-year-holiday-2026';}
   if(id==='mawlid') {date='2026-08-28';estimated=false;title='圣纪节假期（先知穆罕默德诞辰）';detail+=' 2026年实际假期为8月28日；此条记录放假日。';url='https://www.fahr.gov.ae/wp-content/uploads/2026/08/Circular-No.-11-of-2026-Regarding-The-Holiday-of-the-Prophet-Mohammads-Birthday-1448-AH.pdf';}
   if(id==='ramadan') {date='2026-02-18';estimated=false;url='https://www.timeanddate.com/holidays/united-arab-emirates/2026';}
  }
  add(`${id}-${p.year}`,date,title,detail,kind,days,estimated,url);
  if(id==='fitr') {
   const is2026=date.startsWith('2026');
   add(`fitr-extra-${p.year}`,next(date,-1),is2026?'开斋节额外假期（斋月第30天）':'开斋节可能增休一天（待确认）',is2026?'2026年开斋节假期包含3月19日，连同3月20日至22日，共四天。':'仅当当地斋月满30天时，本日才是全国公共假期；若斋月只有29天则本条不构成假期。此条是条件性提示，不是已公布放假安排。',is2026?'公共假期':'条件性假期',1,!is2026,is2026?'https://www.timeanddate.com/holidays/united-arab-emirates/2026':gov);
  }
 }
}
add('federal-extra-2026','2026-05-25','宰牲节联邦政府额外假期','2026年联邦政府部门假期自5月25日至29日。本条仅记录5月25日额外一天；全国私营部门已公布假期为5月26日至29日，不能将本日视作全国统一假期。','联邦政府假期',1,false,'https://www.fahr.gov.ae/en/news/the-federal-authority-for-human-resources-announces-the-eid-al-adha-holiday-for-the-federal-government-from-may-25-29-2026/');
events.sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
fs.mkdirSync('public',{recursive:true});
fs.writeFileSync('public/events.json',JSON.stringify(events,null,2));
const esc=s=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
function fold(line){let arr=[],part='';for(const ch of line){if(Buffer.byteLength(part+ch)>75){arr.push(part);part=' '+ch;}else part+=ch;}arr.push(part);return arr.join('\r\n');}
const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//UAE Chinese Holiday Calendar//ZH-CN','CALSCALE:GREGORIAN','METHOD:PUBLISH','NAME:阿联酋节日 · 中文粉色 · 2026—2030','X-WR-CALNAME:阿联酋节日 · 中文粉色 · 2026—2030','X-WR-TIMEZONE:Asia/Dubai','COLOR:hotpink','X-APPLE-CALENDAR-COLOR:#FF69B4','X-WR-CALDESC:2026—2030年阿联酋全国公共假期及主要本土节庆与纪念日。预计日期不等于政府公布日期；条件性假期须待确认。非官方日历，无自动核实服务。','REFRESH-INTERVAL;VALUE=DURATION:P1D','X-PUBLISHED-TTL:PT24H'];
for(const e of events){const note=e.estimated?'日期说明：按乌姆古拉历推算，阿联酋观月、政府调整或部门安排可能造成差异，实际日期以官方公告为准。':'日期说明：固定公历日期或已核实的2026年安排；实际放假仍以适用政府公告为准。';lines.push('BEGIN:VEVENT',`UID:${e.id}@uae-holidays-zh-pink`, 'DTSTAMP:20261103T060000Z','LAST-MODIFIED:20261103T060000Z','SEQUENCE:0',`DTSTART;VALUE=DATE:${e.date.replaceAll('-','')}`,`DTEND;VALUE=DATE:${e.end.replaceAll('-','')}`,`SUMMARY:${esc(e.name+(e.estimated?'（预计）':''))}`,`DESCRIPTION:${esc('类别：'+e.kind+'\n'+e.description+'\n'+note+'\n资料来源：'+e.url+'\n覆盖范围：全国公共假期及主要本土节庆、纪念日；不包含所有外籍社群节日、地方活动、商业节庆或学校假期。')}`,'LOCATION:阿拉伯联合酋长国',`CATEGORIES:${e.kind}`,'TRANSP:TRANSPARENT',`STATUS:${e.estimated?'TENTATIVE':'CONFIRMED'}`,'COLOR:hotpink',`URL:${e.url}`,'END:VEVENT');}
lines.push('END:VCALENDAR');
const ics=lines.map(fold).join('\r\n')+'\r\n';
fs.writeFileSync('public/uae-holidays-zh-2026-2030.ics',ics);
fs.mkdirSync('exports',{recursive:true});
fs.copyFileSync('public/uae-holidays-zh-2026-2030.ics','exports/阿联酋节日日历-中文粉色-2026-2030.ics');
fs.writeFileSync('public/_headers','/uae-holidays-zh-2026-2030.ics\n  Content-Type: text/calendar; charset=utf-8\n  Content-Disposition: inline; filename="uae-holidays-zh-2026-2030.ics"\n  Cache-Control: public, max-age=3600\n  Access-Control-Allow-Origin: *\n');
const ids=new Set(events.map(e=>e.id));if(ids.size!==events.length)throw Error('duplicate UID');
for(const e of events) if(e.end<=e.date)throw Error('invalid date span');
if(events.filter(e=>e.id.startsWith('ramadan-')&&e.date.startsWith('2030')).length!==2)throw Error('2030 must have two Ramadan starts');
if(ics.split('\r\n').some(l=>Buffer.byteLength(l)>75))throw Error('unfolded content');
console.log(JSON.stringify({events:events.length,byYear:Object.fromEntries([2026,2027,2028,2029,2030].map(y=>[y,events.filter(e=>e.date.startsWith(''+y)).length])),ramadan2030:events.filter(e=>e.id.startsWith('ramadan-')&&e.date.startsWith('2030')).map(e=>e.date),bytes:Buffer.byteLength(ics)},null,2));


