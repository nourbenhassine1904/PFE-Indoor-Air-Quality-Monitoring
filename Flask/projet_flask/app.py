from flask import Flask, request, jsonify
from flask_cors import CORS #Importation et configuration de Flask-CORS pour autorisant les requêtes provenant de votre application Angular
import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier



app = Flask(__name__)
CORS(app, origins="http://localhost:4200") # Active CORS pour notre application Flask

# Charger les données
data = pd.read_excel("excel.xlsx")

# Séparer les features et la cible
FEATURES = ['co2 (ppm)', 'pressure (hPa)', 'humidity (%)', 'o3 (µg/m^3)', 'temperature (°C)', 'no2 (µg/m^3)']
TARGET = 'air_quality'
features = data[FEATURES]
target = data[TARGET]

# Diviser les données en train et test (pas nécessaire pour l'API, mais inclus ici pour référence)
# X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.25, random_state=42)

# Créer et entraîner le modèle k-NN
model = KNeighborsClassifier(n_neighbors=5)
model.fit(features, target)

# Endpoint pour la prédiction
@app.route('/predict', methods=['POST'])
def predict_air_quality():
    data = request.get_json()
    new_sample = np.array(data['values']).reshape(1, -1)
    prediction = model.predict(new_sample)
    solution = afficher_recommandations(prediction[0])
    return jsonify({"air_quality": prediction[0], "solution": solution})

# Fonction pour afficher les recommandations
def afficher_recommandations(niveau_qualite_air):
    recommandations = ""
    
    if niveau_qualite_air == "bonne":
        recommandations = (
            "L'air est de bonne qualité. Profitez-en!\n"
            "- Aucune recommandation particulière pour le moment.\n"
            "- Utilisez des plantes d'intérieur pour purifier l'air.\n"
            "- Contrôlez l'humidité avec un déshumidificateur si nécessaire.\n"
        )
        
    elif niveau_qualite_air == "modérée":
        recommandations = (
            "L'air est modérément pollué, vous pouvez envisager d'aérer votre maison.     "
            " Voici quelques conseils pour améliorer la qualité de l'air:\n      "
            " gardez votre maison propre en éliminant les bactéries et allergènes,\n  "
            " utilisez un filtre HEPA sur votre aspirateur,\n      "
            " envisagez d'installer un purificateur d'air,\n     "
            " pensez à purifier l'air avec des plantes d'intérieur.\n     "
        )
        
    elif niveau_qualite_air == "sensible":
        recommandations = (
            "L'air est sensiblement pollué. Il est recommandé de limiter vos efforts physiques et d'aérer votre maison.\n"
            "- Ouvrez les fenêtres lorsque vous faites du ménage.\n"
            "- Améliorez la ventilation en utilisant un ventilateur d'extraction.\n"
            "- Envisagez d'installer un purificateur d'air.\n"
        )
        
    elif niveau_qualite_air == "mauvais":
        recommandations = (
            "L'air est de mauvaise qualité.\n"
            "- Consultez un médecin si vous avez des problèmes respiratoires.\n"
            "- Utilisez un purificateur d'air avec un filtre HEPA.\n"
            "- Ouvrez les fenêtres lorsque vous faites du ménage.\n"
            "- Améliorez la ventilation en utilisant un ventilateur d'extraction.\n"
            "- Évitez les activités qui peuvent aggraver la qualité de l'air.\n"
        )
        
    elif niveau_qualite_air == "très mauvais":
        recommandations = (
            "L'air est très mauvais. Quittez la zone si possible et contactez les autorités.\n"
            "- Evacuez la zone en suivant les instructions des autorités.\n"
            "- Contactez les services d'urgence si vous avez besoin d'aide.\n"
            "- Utilisez des purificateurs d'air à haute efficacité.\n"
            "- Évitez les activités qui peuvent aggraver la qualité de l'air.\n"
        )
        
    elif niveau_qualite_air == "dangereux":
        recommandations = (
            "L'air est extrêmement dangereux. Evacuez la zone immédiatement et contactez les services d'urgence.\n"
            "- Evacuez la zone en portant un masque et en couvrant vos yeux et votre peau.\n"
            "- Contactez les services d'urgence dès que vous êtes en sécurité.\n"
            "- Utilisez des purificateurs d'air à haute efficacité.\n"
            "- Contactez les autorités compétentes pour obtenir de l'aide.\n"
        )
        
    return recommandations


if __name__ == '__main__':
    app.run(debug=True)
