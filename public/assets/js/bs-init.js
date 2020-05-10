window.$(document).ready(function() {
  window.$('[data-bs-chart]').each(function(index, elem) {
    this.chart = new window.Chart(window.$(elem), window.$(elem).data('bs-chart'));
  });
});
