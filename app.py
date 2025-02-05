import joblib
import numpy as np
from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Cargar modelo y scaler
modelo = joblib.load('modelo_peritazgo.bin')
scaler = joblib.load('scalerPerito.bin')

@app.route('/predecir', methods=['POST'])
def predecir_precio():
    try:
        # Recibir datos del request
        datos = request.json
        features = ['Distancia', 'habitaciones', 'Banos', 'Carros', 'AreaCons', 'AreaNoConstruida']

        # Validar que todos los features estén presentes
        if not all(feature in datos for feature in features):
            return jsonify({"error": "Faltan features requeridos"}), 400

        # Preparar datos para predicción
        X_input = np.array([[datos[feature] for feature in features]])

        # Escalar los datos
        X_scaled = scaler.transform(X_input)

        # Realizar predicción
        precio_predicho = modelo.predict(X_scaled)[0]

        return jsonify({"precio_predicho": float(precio_predicho)})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
