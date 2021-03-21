export function headerTemplate(state) {
  const data = state.title
  return `<input id="input" type="text" value="${data}" class="input">
            <div>
                <div class="button"  data-button="remove">
                    <span class="material-icons" 
                    data-button="remove">delete</span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" 
                    data-button="exit">exit_to_app</span>
                </div>
            </div>`
}
