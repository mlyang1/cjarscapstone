const PAGES = [
  {name: 'home', url: '/'},
  {name: 'about', url: '/about.html'},
  {name: 'links', url: '/links.html'},
  {name: 'gbook', url: 'http://users.smartgb.com/g/g.php?a=s&i=g18-84757-83'},
  {name: 'hr'},
  {name: 'journal', url: '/journal.html'},
  {name: 'fireplace', url: '/fireplace.html'},
  {name: 'zines', url: '/zines.html'},
  {name: 'hr', hidden: true},
  // {name: 'my favs', url: '/favs.html', hidden: true},
  {name: 'my art', url: '/art.html', hidden: true},
  {name: 'place', url: '/place.html', hidden: true},
  {name: 'archive', url: '/archive', hidden: true},
  {name: 'button', url: '/links.html', hidden: true},
];

const element = document.getElementById('nav');
let inner = '';
if (typeof(CURR_PAGE) == 'undefined') CURR_PAGE = '';

if (typeof(isMobileOrTablet) == 'undefined') {
  isMobileOrTablet = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    const isIpadPro = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
    return check || isIpadPro;
  }
}

function isSafari() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') != -1 && ua.indexOf('chrome') < 0;
}

for (let page of PAGES) {
  const hidden = page.hasOwnProperty('hidden');
  const wip = page.hasOwnProperty('wip');
  if (page.name === 'hr') {
    inner += `<hr${hidden ? ' class="hidden"' : ''}>`;
    continue;
  }
  if (page.name === 'gbook') {
    // hide the arrow in safari
    const arrowSpan = isSafari() ? '' : '<span> ↗</span>';
    const arrowClass = isSafari() ? '' : 'gbook--arrow';
    inner += `<li class="nav-li gbook ${arrowClass}"><span><a class="nav-span" href="${page.url}" target="_blank">gbook</a>${arrowSpan}</span></li>`;
    continue;
  }
  if (page.name === 'button') {
    if (CURR_PAGE === 'home') {
      // only show button on homepage
      inner += '<a class="button hidden" href="/links.html"><img width="75" src="/img/buttons/nyanseong-wink.png"></a>';
    }
    continue;
  }
  const hiddenClass = hidden ? ' hidden' : '';
  const wipClass = wip ? ' wip' : '';
  const wipTooltip = wip ? ' title="wip!"' : '';
  if (page.name === CURR_PAGE) {
    inner += `<li class="nav-li${hiddenClass}"><span class="nav-span">→ ${page.name}</span></li>`;
  } else {
    inner += `<li class="nav-li${hiddenClass}"><a class="nav-span${wipClass}" href="${page.url}"${wipTooltip}>${page.name}</a></li>`;
  }
}

// "more" button
inner += '<li class="nav-li" id="nav-mobile-show"><a tabIndex="0" class="nav-span" id="nav-mobile-show-link">..more</a></li>';

// tip text
if (CURR_PAGE === 'zines') {
  inner += '<li class="tip" id="esc-tip">press ESC to pause animation in background</li>';
}

// wrap in <ul>
inner = `<ul class="nav-ul ${isMobileOrTablet() ? 'nav-ul--mobile' : 'nav-ul--monitor'}">${inner}</ul>`;
if (element) element.innerHTML = inner;

const handleClickMore = (e) => {
  e.preventDefault();
  document.getElementById('nav-mobile-show').style.display = 'none';
  for (let item of document.getElementsByClassName('hidden')) {
    item.style.display = 'block';
  }
  console.log(document.getElementById('nav-mobile-show'));
};

const more = document.getElementById('nav-mobile-show-link');
more.addEventListener('click', handleClickMore);
document.onkeydown = (e) => {
  if (e.keyCode === 13 && document.activeElement && document.activeElement.id === 'nav-mobile-show-link') {
    handleClickMore(e);
  }
};
