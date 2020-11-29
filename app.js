// Book Constructor
function Book(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create TR Element
    const row = document.createElement('tr');
    // Insert Cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);

}
// Show Alert 
UI.prototype.showAlert = function(message, className) {
    // Create Div
    const div = document.createElement('div');
    // Add Classes 
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div,form);
    // TimeOut After 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 2000);
}
// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

// Book Form Event Listener For Add Books
document.getElementById('book-form').addEventListener('submit',function(e){
    // Get Input Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    // Instantiate Book
    const book = new Book(title,author,isbn);

    // Instantiate UI 
    const ui = new UI();

    // Validate
    if(title === '' ||author === '' ||isbn === '') {
        
        // Error Alert 
        ui.showAlert('Please Fill In All Fields', 'error');

    } else {
        // Add Book To List
        ui.addBookToList(book);
        // Show Sucess
        ui.showAlert('Book Added', 'success')
        // Clear Field;
        ui.clearFields();
    }

    e.preventDefault();

})

// Evenet Listeners For Delete Books
document.getElementById('book-list').addEventListener('click',function(e){
    // Instantiate UI 
    const ui = new UI();

    ui.deleteBook(e.target);
    // Show Messgae
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});