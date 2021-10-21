window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = `
      const sliderInit = () => {
          let activeIndex = 0;
          let touchstartX = 0;
          let touchendX = 0;

          const setActiveIndex = (active) => {
            document.querySelectorAll('.option-container').forEach((el, i) => {
              el.style.setProperty('--offset', active - i);
              if (active - i === 0) {
                el.classList.add('active');
              } else {
                el.classList.remove('active');
              }
            });

            document.querySelector('#btn-slider-right').style.display = 'block';
            document.querySelector('#btn-slider-left').style.display = 'block';

            if (activeIndex === 0) {
              document.querySelector('#btn-slider-left').style.display = 'none';
            }
            if (activeIndex === 2) {
              document.querySelector('#btn-slider-right').style.display = 'none';
            }

            document.querySelectorAll('.slider-progress .circle').forEach((el, i) => {
              if (active === i) {
                el.classList.add('active');
              } else {
                el.classList.remove('active');
              }
            });
          };

          setActiveIndex(activeIndex);

          function handleGesture() {
            if (touchendX > touchstartX) {
              if (activeIndex > 0) {
                activeIndex--;
                setActiveIndex(activeIndex);
              }
            }
            if (touchendX < touchstartX) {
              if (activeIndex < 2) {
                activeIndex++;
                setActiveIndex(activeIndex);
              }
            }
          }
          // Handles Slider Button clicks
          document.querySelector('#btn-slider-left').addEventListener('click', (e) => {
            if (activeIndex > 0) {
              activeIndex--;
              setActiveIndex(activeIndex);
            }
          });

          document.querySelector('#btn-slider-right').addEventListener('click', (e) => {
            if (activeIndex < 2) {
              activeIndex++;
              setActiveIndex(activeIndex);
            }
          });

          // Handles Slide selection via the progress circles
          document.querySelectorAll('.slider-progress .circle').forEach((el) => {
            el.addEventListener('click', () => {
              activeIndex = parseInt(el.dataset.sliderprogress);
              setActiveIndex(activeIndex);
            });
          });

          // Handles Slider Swiping
          const slider = document.querySelector('#c-blocker .options-container');
          slider.addEventListener('touchstart', (e) => {
            touchstartX = e.changedTouches[0].screenX;
          });

          slider.addEventListener('touchend', (e) => {
            touchendX = e.changedTouches[0].screenX;
            handleGesture();
          });


          // Handles submission on 'enter' key press
          document.querySelectorAll('#c-blocker form').forEach((el) => {
            el.addEventListener('keyup', (e) => {
              if (e.keyCode === 13) {
                const zipcode = el.querySelector('input').value;
                window.location.href = el.querySelector('a').href + '&zipcode=' + zipcode;
              }
            });
          });

           // Handles submission on "choose" btn press
          document.querySelectorAll('#c-blocker form a').forEach((el) => {
            el.addEventListener('click', (e) => {
              e.preventDefault();
              const zipcode = el.parentElement.querySelector('input').value;
              window.location.href = el.href + '&zipcode=' + zipcode;
            });
          });
        };

        const intervalId = setInterval(() => {
          if (document.querySelector('#c-blocker')) {
            sliderInit();
            clearInterval(intervalId);
          }
        }, 50);

        setTimeout(() => {
            clearInterval(intervalId);
        }, 7000);

        window.addEventListener('connextIsSubscriber', () => {
           clearInterval(intervalId);
        })
    `;

  document.querySelector('head').appendChild(script);
});
