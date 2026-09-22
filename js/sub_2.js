$(function () {
    AOS.init();

    let resizeTimer;

    $(window).on('resize', function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            AOS.refresh();
        }, 200);
    });
    


   
})

$(function () {
    const track = document.querySelector('.scetion01 .merch_track');

    if (!track) return;

    let index = 0;
    let timer = null;
    let animation = null;
    let touching = false;
    let sliderActive = false;

    function getOriginalItems() {
        return track.querySelectorAll('.merch:not(.clone)');
    }

    function getItems() {
        return track.querySelectorAll('.merch');
    }

    function getTarget(index) {
        const items = getItems();
        const item = items[index];

        return item.offsetLeft
            - track.clientWidth / 2
            + item.offsetWidth / 2;
    }

    function createClones() {
        if (track.querySelector('.clone')) return;

        const originalItems = Array.from(getOriginalItems());

        originalItems.forEach(function (item) {
            const clone = item.cloneNode(true);

            clone.classList.add('clone');
            clone.removeAttribute('data-aos');
            clone.removeAttribute('data-aos-duration');
            clone.removeAttribute('data-aos-delay');

            track.appendChild(clone);
        });
    }

    function removeClones() {
        track.querySelectorAll('.clone').forEach(function (clone) {
            clone.remove();
        });
    }

    function moveToNext() {
        if (!sliderActive || touching) return;

        const originalLength = getOriginalItems().length;

        index++;

        const target = getTarget(index);

        function move() {
            if (!sliderActive || touching) return;

            const current = track.scrollLeft;
            const distance = target - current;

            if (Math.abs(distance) <= 1) {
                track.scrollLeft = target;

                if (index === originalLength) {
                    index = 0;
                    track.scrollLeft = getTarget(0);
                }

                timer = setTimeout(function () {
                    moveToNext();
                }, 2000);

                return;
            }

            track.scrollLeft += 0.7;

            animation = requestAnimationFrame(move);
        }

        move();
    }

    function startSlider() {
        if (sliderActive) return;

        sliderActive = true;
        index = 0;

        createClones();

        track.scrollLeft = getTarget(0);

        timer = setTimeout(function () {
            moveToNext();
        }, 2000);
    }

    function stopSlider() {
        sliderActive = false;
        touching = false;
        index = 0;

        clearTimeout(timer);
        cancelAnimationFrame(animation);

        track.scrollLeft = 0;

        removeClones();
    }

    track.addEventListener('touchstart', function () {
        if (!sliderActive) return;

        touching = true;

        clearTimeout(timer);
        cancelAnimationFrame(animation);
    });

    track.addEventListener('touchend', function () {
        if (!sliderActive) return;

        touching = false;

        const items = getItems();
        const originalLength = getOriginalItems().length;

        const center =
            track.scrollLeft + track.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach(function (item, i) {
            const itemCenter =
                item.offsetLeft + item.offsetWidth / 2;

            const distance =
                Math.abs(center - itemCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        index = closestIndex;

        if (index >= originalLength) {
            index -= originalLength;
            track.scrollLeft = getTarget(index);
        }

        timer = setTimeout(function () {
            moveToNext();
        }, 2000);
    });

    function checkSlider() {
        if (window.innerWidth <= 425) {
            startSlider();
        } else {
            stopSlider();
        }
    }

    checkSlider();

    let resizeTimer;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            checkSlider();
        }, 200);
    });
});