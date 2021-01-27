(function () {
    const $list               = document.querySelector('.portfolio-list'),
          $listHiddenItems    = $list.querySelectorAll('.portfolio-item.hidden'),
          $listCollapsePos    = $list.querySelector('.portfolio-collapse-pos'),
          $listExpander       = document.querySelector('.portfolio-expander'),
          listCollapsedHeight = $listCollapsePos.offsetTop + $listCollapsePos.offsetHeight;

    collapsePortfolioList();

    $listExpander.addEventListener('click', expandPortfolioList);

    function collapsePortfolioList() {
        $list.style.height = listCollapsedHeight + 'px';
    }

    function expandPortfolioList() {
        Array.from($listHiddenItems).forEach(function (e) {
            e.classList.remove('hidden');
        });

        $list.style.height = $list.scrollHeight + 'px';
        $list.classList.add('expanded');
        $listExpander.classList.add('hidden');
    }
})();
