(function() {
    function displaySearchResults(results, store) {
        let searchResults = document.getElementById('search-results');

        if (results.length) {
            // var appendString = '';
            let fragment = document.createDocumentFragment();

            for (var i = 0; i < results.length; i++) {
                var item = store[results[i].ref];
   
                let post = document.createElement('li');

                let titleLink = document.createElement('a');  
                titleLink.classList.add("post-link");
                titleLink.href = item.url

                let title = document.createElement('h2');
                title.classList.add("post-title");
                title.textContent = item.title

                titleLink.appendChild(title)
                post.appendChild(titleLink);

                // category container
                let categoryDateContainer = document.createElement('div');
                categoryDateContainer.classList.add('post-meta');

                // category
                let categories = document.createElement('ul');
                categories.classList.add('post-categories');

                let categoryList = document.createElement('li');
                categoryList.textContent = item.category;

                categories.appendChild(categoryList);

                // date
                let date = document.createElement('div');
                date.setAttribute('id', 'date-order');
                date.classList.add('post-date');

                date.textContent = item.date;

                let dateIcon = document.createElement('i');
                dateIcon.classList.add('icon-calendar');

                date.appendChild(dateIcon);

                // append
                categoryDateContainer.appendChild(categories);
                categoryDateContainer.appendChild(date);


                post.appendChild(categoryDateContainer);

                fragment.appendChild(post);
            }

            searchResults.appendChild(fragment);
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }
  
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');XMLHttpRequestEventTarget

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                }
        }
    }
  
    var searchTerm = getQueryVariable('query');

    if (searchTerm == "") {
        window.location.replace("/blog");
    }

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        var idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('category');
            this.field('date');

            for (var key in window.store) {
                this.add({ 'id': key, 'title': window.store[key].title, 'category': window.store[key].category, 'date': window.store[key].date })
            }
        });

        var results = idx.search(searchTerm);
        displaySearchResults(results, window.store);

    }
})();
  