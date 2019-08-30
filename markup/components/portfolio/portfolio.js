(function () {
    var $portfolioList = document.querySelector('.portfolio-list'),
        $portfolioListCollapsePos = $portfolioList.querySelector('.portfolio-collapse-pos'),
        $portfolioListExpander = $portfolioList.querySelector('.portfolio-expander'),
        portfolioListCollapsedHeight = $portfolioListCollapsePos.offsetTop + $portfolioListCollapsePos.offsetHeight;

    collapsePortfolioList();

    $portfolioListExpander.addEventListener('click', expandPortfolioList);

    function collapsePortfolioList() {
        $portfolioList.style.height = portfolioListCollapsedHeight + 'px';
    }

    function expandPortfolioList() {
        $portfolioList.style.height = $portfolioList.scrollHeight + 'px';
        $portfolioListExpander.classList.add('hide');
    }
})();
