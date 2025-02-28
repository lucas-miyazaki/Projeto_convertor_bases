from flask import Flask, jsonify, request
from flask_cors import CORS
from converter import decimalParaBase, readConfig, baseParaDecimal

app = Flask("Converter API")
CORS(app)

@app.route("/")
def home():
    return "API de Conversão de Bases"

@app.route("/converter/<numero>/<base1>/<base2>")
def api_call_db(numero, base1, base2):
    try:
        base1 = int(base1)
        base2 = int(base2)

        if base1 == 1 or base2 == 1:
            return jsonify({"erro": "Base 1 não é aceita"}), 400

        resultado = decimalParaBase(baseParaDecimal(numero, base1), base2, readConfig("config.txt"))
        return jsonify({"resultado": resultado})
    except ValueError:
        return jsonify({"erro": "Número inválido para a base especificada."}), 400
    except ZeroDivisionError:
        return jsonify({"erro": "Base 0 não é válida"}), 400
    except Exception as e:
        print(f"Erro interno: {e}")  # Log do erro no servidor
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
