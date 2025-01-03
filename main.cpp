#include <iostream>
#include "circular_buffer.h"

// Определение структуры CircularBuffer
struct CircularBuffer {
    int data;
    CircularBuffer* next;
};

// Функция для добавления нового элемента в кольцевой буфер
CircularBuffer* insert_next(CircularBuffer* current, int value) {
    auto* newNode = new CircularBuffer;
    newNode->data = value;

    if (current != nullptr) {
        newNode->next = current->next;
        current->next = newNode;
    } else {
        newNode->next = newNode; // Если текущий элемент nullptr, делаем новый элемент первым в буфере
    }

    return newNode;

}

// Функция для удаления элемента из кольцевого буфера
CircularBuffer* remove_next(CircularBuffer* current) {
    if (current == nullptr || current->next == current) {
        delete current;
        return nullptr;
    }

    CircularBuffer* temp = current->next;
    current->next = temp->next;
    delete temp;

    return current->next;
}

// Удаление буфера для борьбы с утечкой памяти
void delete_buffer(CircularBuffer* head) {
    if (head == nullptr)
        return;

    CircularBuffer* current = head;
    do {
        CircularBuffer* next = current->next;
        delete current;
        current = next;
    } while (current != head);
}

// Решение задачи "Иосифа Флавия" на основе кольцевого буфера
int josephus_flavius(CircularBuffer* start, int count) {
    CircularBuffer* current = start;
    while (current->next != current) {
        for (int i = 1; i < count - 1; ++i) {
            current = current->next;
        }
        current = remove_next(current);
    }
    return current->data;
}

// Решение задачи "Иосифа Флавия" на основе массива
int josephus_flavius_array(int* array, int size, int count) {
    int index = 0;
    while (size > 1) {
        index = (index + count - 1) % size;
        for (int i = index; i < size - 1; ++i) {
            array[i] = array[i + 1];
        }
        size--;
    }
    return array[0];
}

// Пример использования
void main_3() {
    std::cout << std::endl;
    std::cout << "dynamic_array.cpp"<< std::endl;
    std::cout << "==============="<< std::endl;
    CircularBuffer* buffer = nullptr;

    // Создание кольцевого буфера и заполнение его значениями от 1 до 10
    for (int i = 1; i <= 10; ++i) {
        if (buffer == nullptr) {
            buffer = insert_next(nullptr, i);
        } else {
            buffer = insert_next(buffer, i);
        }
    }

    // Вывод значений кольцевого буфера
    CircularBuffer* current = buffer;
    std::cout << "Circular buffer: ";
    do {
        std::cout << current->data << " ";
        current = current->next;
    } while (current != buffer);
    std::cout << std::endl;

    // Решение задачи "Иосифа Флавия" для кольцевого буфера
    int count = 3;
    int survivor = josephus_flavius(buffer, count);
    std::cout << "Survivor using circular buffer: " << survivor << std::endl;

    // Создание и заполнение массива значениями от 1 до 10
    int array[10];
    for (int i = 0; i < 10; ++i) {
        array[i] = i + 1;
    }

    // Решение задачи "Иосифа Флавия" для массива
    survivor = josephus_flavius_array(array, 10, count);
    std::cout << "Survivor using array: " << survivor << std::endl;
    std::cout << "==============="<< std::endl;


    std::cout << std::endl;

}
