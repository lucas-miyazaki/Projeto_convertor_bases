import os

def readConfig(filename):
    if not os.path.exists(filename):
        return {}  # Retorna um dicionário vazio se o arquivo não existir

    param = []
    defined_param = {}
    with open(filename, "r") as f:
        undParm = f.read().strip().split("\n")
        for i in undParm:
            if "=" in i:
                param.append(i.split("="))
    
    for i in param:
        if len(i) == 2:
            defined_param[i[1]] = i[0]

    return defined_param if defined_param else None

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

    return final if final else "0"  # Retorna "0" caso o número seja zero

def baseParaDecimal(num, base):
    try:
        base = int(base)
        return str(int(num, base))  # Usa a conversão direta do Python para bases numéricas
    except ValueError:
        raise ValueError(f"Número inválido '{num}' para a base {base}")
