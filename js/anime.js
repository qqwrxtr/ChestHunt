document.addEventListener("DOMContentLoaded", function (event) {
    const gridImg = document.querySelectorAll(".chests-grid__img");
    const attemptsEl = document.querySelector(".attempts__count");
    const mainWrapper = document.querySelector(".main");
    let state = "closed";
    let select = true;
    let attemptsCount = 4;
    let clickCount = 0;

    function getRandomChest() {
        let chest = gridImg[Math.floor(Math.random() * gridImg.length)];
        chest.classList.add("shake");
        setTimeout(function () {
            chest.classList.remove("shake");
        }, 1000);
    }

    const chestInterval = setInterval(getRandomChest, 3000);

    function countDecrement() {
        let countDec = attemptsCount - 1;
        anime({
            targets: attemptsEl,
            innerHTML: [attemptsCount, countDec],
            easing: 'steps(1)',
            round: 1
        });

        attemptsCount = countDec;
    }

    function showForm() {
        const formModal = document.querySelector(".form-modal");
        formModal.classList.add("form-modal--active");
    }

    function popup(className) {
        let domElem = document.querySelector(className);
        document.querySelectorAll(".popup").forEach((item) => { item.classList.remove('popup--active'); })
        domElem.classList.add('popup--active');
    }

    setTimeout(popup, 1000, ".popup--welcome");

    document.querySelector(".chests-grid").addEventListener("click", function (e) {
        if (e.target.classList.contains('chests-grid__img') && select) {
            select = false;
            clickCount++;

            switch (state) {
                case "closed":
                    stateSwitch(e.target, "empty");
                    stateSwitch(e.target.closest('.chests-grid__item'), "empty");
                    countDecrement();
                    state = "empty";
                    select = true;
                    break;
                case "empty":
                    if (clickCount === 3) {
                        stateSwitch(e.target, "bonus");
                        stateSwitch(e.target.closest('.chests-grid__item'), "bonus");
                        countDecrement();
                        setTimeout(showForm, 1000);
                        state = "bonus";
                        select = false;
                        clearInterval(chestInterval);
                        setTimeout(popup, 500, ".popup--win");
                    } else {
                        stateSwitch(e.target, "empty");
                        stateSwitch(e.target.closest('.chests-grid__item'), "empty");
                        countDecrement();
                        state = "empty";
                        select = true;
                    }
                    break;
                default:
                    break;
            }
        }

        function stateSwitch(target, newState) {
            target.classList.add(newState);
        }
    });

    $('.popup__button').on('click', function (e) {
        var parent = $(e.target).closest('.popup');
        $(parent).removeClass('popup--active');
        if (mainWrapper.classList.contains('pointer-events--none')) {
            mainWrapper.classList.remove('pointer-events--none');
        }
        select = true;
    });
});
