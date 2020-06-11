/* eslint-disable */
const loadMobileWidget = () => {
  const weatherWidget = document.querySelector('.nav-weather-widget');
  const weatherWidgetEl = document.querySelector('#aw-widget-st');
  const isMobileBP = window.innerWidth < 1024;
  if (isMobileBP && weatherWidgetEl.innerHTML === '') {
    weatherWidget.innerHTML += '<link rel="stylesheet" href="https://proxy.webwidgets.accuweather.com/css/med_sticker.css" />';
    (function(w,d,s,o,f,js,fjs) {
      w['Accu-Widget']=o;
      w[o]=w[o]||function(){
        (w[o].q=w[o].q||[]).push(arguments)
      };
      js=d.createElement(s),
      fjs=d.getElementsByTagName(s)[0];
      js.id=o;
      js.src=f;
      js.async=1;
      fjs.parentNode.insertBefore(js,fjs)
    }(window,document,'script','aw','https://proxy.webwidgets.accuweather.com/js/med_sticker.js'));
    aw('config',{
      idTag: 'aw-widget-st',
      key: 'FOanjJpD8h',
      pCode: 'dg_atljc_news',
      variant: 1
    });
    window.removeEventListener('resize', loadMobileWidget);
  }
};

window.addEventListener('DOMContentLoaded', loadMobileWidget);
window.addEventListener('resize', loadMobileWidget);
