def sum_of_list(list_data):
     result = 0
     for i in range(0, len(list_data)):
        result = result + list_data[i]
     return result


def merge_and_sort(list_data_a, list_data_b):
    
     final_result = list_data_a + list_data_b;
     final_result.sort()
     return final_result


def delete_a_list_element(list_data, element_value):
    if element_value in list_data:
         list_data.remove(element_value)
         result = list_data
         return result
    else:
        return 0


def comparison_list_size(list_data_a, list_data_b):
    
    a = len(list_data_a)
    b= len(list_data_b)
    if a > b:
        return list_data_a
    elif a < b:
        return list_data_b
    else:
        return list_data_a
   
def odd_even_check(a, b):
    result = a + b
    if result % 2 == 0:
        return "Even"
    else:
        return "Odd"

def discount_price(price):
    if price >= 100000:
        result  = 0.20 * price
        result = price - result
        return result
    else:
        result  = 0.10 * price
        result = price - result
        return result
        



def find_smallest_value(list_data):
    result = list_data[0]
    for i in range(0, len(list_data)):
        if result > list_data[i]:
            result = list_data[i]
    return result
        


def binary_converter(decimal_number):
    result = bin(decimal_number)[2:]
    return result.strip()



def number_of_cases(list_data):
    
    result = set(list_data)
    result = list(result)
    return result

    


def main():
    result = sum_of_list([34, 45, 67])
    print("sum of list result: ", result)
    result_two = merge_and_sort([2, 4, 1, 6, 3], [9, 7, 8, 5])
    print("merge and sort result: ", result_two)
    result_three = delete_a_list_element(['a', 'f', 'r', 'w', 'k'], 'f')
    print("after removing a element", result_three)
    resultfour = comparison_list_size([1, 2, 3, 4, 5], [10, 9, 8, 7, 6])
    print("after comparing list", resultfour)
    result_five = odd_even_check(9,4)
    print("odd and even checking: ", result_five)
    result_six = discount_price(110000)
    print("dicount price: ", result_six)
    result_seven = find_smallest_value([4, 3, 2, 1, 8, 9, 19, 88])
    print("finding smallest value: ", result_seven)
    result_eight = binary_converter(100)
    print("binary converting: ", result_eight)
    result_nine = number_of_cases(['aa', 'ab', 'ac', 'ab', 'bb', 'bc', 'ca', 'cb', 'cc'])
    print("number of cases: ", result_nine)


if __name__ == "__main__":
    main()
