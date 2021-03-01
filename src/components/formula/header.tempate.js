export function headerTemplate(state) {
  const data = state.tableTitleState.data || 'table'
  return `<input id="input" type="text" value="${data}" class="input">
            <div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>`
}
