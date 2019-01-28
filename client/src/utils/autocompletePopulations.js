import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import { POPULATION } from './population';

window.jQuery = $;

export const autocompletePopulations = () => {
  $('input.autocomplete').autocomplete({
    source: (request, response) => {
      const results = $.ui.autocomplete.filter(POPULATION, request.term);
      response(results.slice(0, 6));
    },
    select: (event, ui) => {
      const text = ui.item.label;
      $('input.autocomplete').val(text);
      event.preventDefault();
    },
    minLength: 2,
    messages: {
      noResults: '',
      results: function() {}
    },
    focus: (event, ui) => {
      event.preventDefault();
    }
  });
}
