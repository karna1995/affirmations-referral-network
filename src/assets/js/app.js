(function(root, $, _, Backbone, Affirmations) {
  var $filtersContainer = $('#filters-container');
  var providers = new Affirmations.Providers();
  var filtersView = new Affirmations.FiltersView({
    collection: providers
  });
  var listView = new Affirmations.ProviderListView({
    collection: providers,
    el: $('#providers')
  }).summarize();
  var searchView = new Affirmations.SearchView({
    collection: providers
  });
  var router = new Affirmations.Router();
  var $filtersBtn = $('<button>')
    .addClass('btn btn-default')
    .html('Filter providers')
    .click(function(evt) {
      evt.preventDefault();
      router.navigate('', {trigger: true});
    });

  //$filtersContainer.append(searchView.render().$el);
  $filtersContainer.append(filtersView.$el);
  providers.url = 'data/providers.json';
  providers.fetch();

  listView.$el.hide();
  $('#providers').before($filtersBtn);

  filtersView.on('showproviders', function() {
    router.navigate('providers', {trigger: true});
  });

  router.on('route:providers', function() {
    window.scrollTo(0, 0);
    listView.$el.show();
    $filtersBtn.show();
    $filtersContainer.hide();
  });

  router.on('route:index', function() {
    window.scrollTo(0, 0);
    listView.$el.hide();
    $filtersBtn.hide();
    $filtersContainer.show();
  });

  Backbone.history.start({});
})(this, jQuery, _, Backbone, Affirmations);
