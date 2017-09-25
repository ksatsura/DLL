const Node = require('./node'); //звено списка

class LinkedList {
    constructor() 
	{
		this._head = null;
	    this._tail = null;
	    this.length = 0; // инициализируем переменные класса
		
	}
	
    append(data) {
		
		var node  = new Node(data);// создание экземляра класса Node
		
		if (this.length != 0) { // если узлы уже существуют
			this._tail.next = node;
			node.prev = this._tail;
			this._tail = node;
		} else {
			this._tail = node;
			this._head = node; //если узел первый
		}
		this.length++;
		return this;
		
	}

    head() {
		
		return this._head.data
	}

    tail() {
		
		return this._tail.data;
	}

    at(index) {
		
		var temp = this._head; // переменная, показывающая текущую позицию
		for (var i = 0; i < index; i++) {
			temp = temp.next;
		}
		return temp.data;
		
	}

    insertAt(index, data) {	
		var message = {failure:"Error: node with this index doesn't exist"};
		
		
		if (this.length === 0) {
		    return this;
		}
	    if (index < 0 || index >= this.length) {
			throw new Error (message.failure);
		}
		var temp = this._head,		// переменная, показывающая текущую позицию
		    temp2,
			temp3;
		var node  = new Node();
		for (var i = 0; i < index; i++) {
			temp = temp.next;
		}
		this.length++;
		temp2 = temp;
		for (var i = index + 1; i < this.length; i++) {
			if (temp2.next === null) { // при достижении конца списка
				this._tail = temp2;
				this._tail.next = node; // добавление нового узла в связи с увеличением списка на один элемент
			    node.prev = this._tail; 
			    this._tail = node;
				node.data = temp2.data; // присвоение последнему узлу в списке значенияж
			} else {
		    temp3 = temp2.next; // переход по списку и смещение значений в узлах списка
			temp2.next.data = temp2.data;
			temp2 = temp3;
			}
		}
		temp.data = data;
		return this;	
	}

    isEmpty() {
		
		if (this.length === 0) {
			return true;
		} else { return false;}
		
	}

    clear() {
		var temp = this._head;
	    while (temp != null) {
			var tempClear = temp;
			temp = temp.next;
			tempClear.data = null; // удаление значения узла
			this.length--;
		}
		return this;
	}

    deleteAt(index) {
		
		var message = {failure:"Error: node with this index doesn't exist"};
		
		if (index < 0 || index >= this.length || this.length === 0) {
			throw new Error (message.failure);
        }
		
		var temp = this._head; // текущая позиция элемента в списке
		var tempPr, tempNx;		// узлы, следующие за и перед искомым
		if (index === 0) {
			this._head = temp.next; // перемещаем начало списка на одну позицию
			if (this._head === null) { // проверяем на наличие последующего узла
                   this._tail = null;	// в списке нет ни одного элемента
			} else {
		        this._head.prev = null;
			}
			
		} else if (index === (this.length - 1)) {
			temp = this._tail;
			 this._tail = temp.prev;
			 this._tail.next = null;
			 
		} else {
		var i = 0;
		while (i < index) {
			temp = temp.next;
			i++;
		}
		tempPr = temp.prev; //с помощью временных переменных перезапись указателей и удаление элемента
		tempNx = temp.next;
		tempPr.next = tempNx;
		tempNx.prev = tempPr;
		temp = null;
		}
		this.length--;
		return this;
	}

    reverse() {
		var temp, tempRev;
		temp = this._head; // текущий элемент
		
		while (temp != null) {
			tempRev = temp.next; //присвоение временной переменной указателя на следующий элемент
			temp.next = temp.prev; //перемена местами указателей на следующий и текущий элементы
			temp.prev = tempRev; //переменный узел изменил положение относительно текущего узла
			temp = tempRev; // смещение по списку от низа к верху	
		}
		temp = this._tail; //текущий элемент стал последним
		this._tail = this._head; //последний элемент присвоил значение первого
		this._head  = temp;		//первый элемент присвоил значение последнего
		return this;
	}

    indexOf(data) {
		
		var temp = this._head;
		var index = 0;
		while (temp != null) {
			if (temp.data === data) {
				return index;
			}
			temp = temp.next;
			index++;
		}
		return -1;
	}
	
}

module.exports = LinkedList;
