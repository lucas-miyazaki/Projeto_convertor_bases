import os

def readConfig(filename):
    param = []
    revParam = {}
    defined_param = {}
    with open(filename, "r") as f:  
        undParm = f.read().split("\n")
        for i in undParm:
            param.append(i.split("="))
    for i in param:
        defined_param[i[1]] = i[0]
        revParam[i[0]] = i[1]
    if defined_param == {}:
        defined_param = None
        revParam = None
    return [defined_param, revParam]

def decimalParaBase(num, base, param=None):
    num = int(num)
    base = int(base)
    final = ""
    arrayDoProcesso = []

    while num > 0:
        num_sobra = num % base
        arrayDoProcesso.append(num_sobra)
        num //= base

    if param is None:
        for i in reversed(arrayDoProcesso):
            final += str(i)
    else:
        for i in reversed(arrayDoProcesso):
            for key, value in param.items():
                i = str(i).replace(key, value)
            final += i
    return final

def baseParaDecimal(num, base, parms={}):
    print(parms)
    split_num = list(reversed(list(num)))
    currentSplit = 0
    final = 0
    try:
        base = int(base)
        for i in split_num:
            if i in parms:
                i = parms[i]
            print(i)
            final += int(i)*(pow(base, currentSplit))
            currentSplit+=1
    except ValueError:
        raise ValueError(f"Número inválido '{num}' para a base {base}") #Só acontece caso a base seja maior que o número informado.
    print(final)
    return final
