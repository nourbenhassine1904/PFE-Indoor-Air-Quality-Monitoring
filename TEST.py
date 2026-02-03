#Collecte et nettoyage des données 
# Importation des modules nécessaires
import pandas as pd
import numpy as np
import csv
import datetime
import openpyxl
import seaborn as sns #pour la visualisation
import sklearn
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
from sklearn.model_selection import cross_val_score
from sklearn.utils.validation import check_X_y

# Définition des catégories de qualité de l'air
air_quality = {
    'bonne': (0.8, 1.0),
    'satisfaisante': (0.6, 0.8),
    'moyenne': (0.4, 0.6),
    'médiocre': (0.2, 0.4),
    'mauvaise': (0.0, 0.2)
}

def categoriser_qualite_air(co2, pressure, humidity, o3, temperature, no2):

  """
  Fonction pour catégoriser la qualité de l'air en fonction de seuils précis et des 6 niveaux définis.

  Args:
    co2 (float): Valeur de CO2.
    pressure (float): Valeur de pression.
    humidity (float): Valeur d'humidité.
    o3 (float): Valeur d'ozone o3'.
    temperature (float): Valeur de temperature.
    no2 (float): Valeur d'azote (NO2).

  Returns:
    str: La qualité de l'air ("bonne", "modérée", etc.).
  """

  if co2 < 400 and pressure > 1000 and humidity < 50 and o3 < 50 and temperature < 25 and no2 < 40:
    return "bonne"
  elif co2 < 600 and pressure > 980 and humidity < 60 and o3 < 100 and temperature < 30 and no2 < 60:
    return "modérée"
  elif co2 < 1000 and pressure > 960 and humidity < 70 and o3 < 150 and temperature < 35 and no2 < 80:
    return "sensible"
  elif co2 < 1500 and pressure > 940 and humidity < 80 and o3 < 200 and temperature < 40 and no2 < 100:
    return "mauvais"
  elif co2 < 2000 and pressure > 920 and humidity < 90 and o3 < 300 and temperature < 45 and no2 < 120:
    return "très mauvais"
  else:
    return "dangereux"

def definir_notification_simple(health):
  """
  Fonction pour définir la notification en fonction de la valeur de "health".

  Args:
    health (int or float): La valeur de la colonne "health".

  Returns:
    str: La notification à afficher.
  """

  if health > 800:
    return "Bonne santé"
  elif health > 600:
    return "Santé légèrement diminuée"
  elif health > 400:
    return "Santé moyenne"
  elif health > 200:
    return "Santé préoccupante"
  elif health > 0:
    return "Alerte ! Risque pour la santé"
  elif health == -200:
    return "Alerte gaz ! Evacuez la zone immédiatement"
  elif health == -800:
    return "Alerte incendie ! Evacuez la zone immédiatement"
  else:
    return "Valeur de santé incorrecte"

# Chargement du dataset
df1 = pd.read_csv("laboratory.csv")
df2 = pd.read_csv("one_room_apartement.csv")

# Concaténer
df = pd.concat([df1, df2], axis=0)

df["notification"] = df.apply(lambda x: definir_notification_simple(x["health"]), axis=1)


# Ajout de la colonne "air_quality" au DataFrame
df["air_quality"] = df.apply(lambda x: categoriser_qualite_air(x["co2"], x["pressure"], x["humidity"], x["o3"], x["temperature"], x["no2"]), axis=1)



# Afficher les cinq premiéres des datasets concaténée
print(df.head())

# Trier le DataFrame par l'index
df.sort_index(inplace=True)
# Sélectionner les colonnes désirés
df = df[['co2', 'pressure', 'humidity','o3', 'temperature', 'no2', 'timestamp', 'health', 'air_quality', 'notification']]
# Colonnes et unités
colonnes_unites = [
    ("co2", "ppm"),
    ("pressure", "hPa"),
    ("humidity", "%"),
    ("o3", "µg/m^3"),
    ("temperature", "°C"),
    ("no2", "µg/m^3"),
]

# Renommer les colonnes avec compréhension de dictionnaire
df = df.rename(columns=dict(zip(df.columns, [f"{col} ({unite})" for col, unite in colonnes_unites])))

# Affichage du DataFrame
print(df.head())

# Afficher dataset
print(df)
print(df.tail()) #affiche les 5 dérnières lignes

# Encodage des labels
le = LabelEncoder()
y_train = le.fit_transform(df["air_quality"])

# Préparation des données
# Supprimer les valeurs manquantes en conservant les lignes avec des valeurs nulles
df = df.dropna(subset=['co2 (ppm)', 'pressure (hPa)', 'humidity (%)', 'o3 (µg/m^3)', 'temperature (°C)', 'no2 (µg/m^3)'], how='all')
df = df.drop_duplicates() # Supprimer les doublons

#Traitement et classification des données
# Normalisation des données
scaler = StandardScaler()
rescaledX = scaler.fit_transform(df[['co2 (ppm)', 'pressure (hPa)', 'humidity (%)', 'o3 (µg/m^3)', 'temperature (°C)', 'no2 (µg/m^3)']])

# Exploration des donnÃ©es
print(df.info())
df.describe()

# Visualisation des distributions
sns.displot(df['co2 (ppm)'])
sns.displot(df['pressure (hPa)'])
sns.displot(df['humidity (%)'])
sns.displot(df['o3 (µg/m^3)'])
sns.displot(df['temperature (°C)'])
sns.displot(df['no2 (µg/m^3)'])

# Normalisation des données
scaler = StandardScaler()
rescaledX = scaler.fit_transform(df[['co2 (ppm)', 'pressure (hPa)', 'humidity (%)', 'o3 (µg/m^3)', 'temperature (°C)', 'no2 (µg/m^3)']])

# Séparation des données en ensembles d'apprentissage et de test
X_train, X_test, y_train, y_test = train_test_split(rescaledX, y_train, test_size=0.2, random_state=42)

# Choix du modéle
# Régression linéaire
model_reg = LinearRegression()
model_reg.fit(X_train, y_train)
# K plus proches voisins
model_knn = KNeighborsClassifier(n_neighbors=5)
model_knn.fit(X_train, y_train)


# évaluation des modéles
# Régression linéaire
y_pred_reg = model_reg.predict(X_test)
r2_score = metrics.r2_score(y_test, y_pred_reg)
print("R^2 score (Régression linéaire) :", r2_score)

# K plus proches voisins
y_pred_knn = model_knn.predict(X_test)
accuracy = metrics.accuracy_score(y_test, y_pred_knn)
print("Précision (K plus proches voisins) :", accuracy)

# Utilisation du moèle choisi
# Prédiction pour une nouvelle observation
new_observation = np.array([[450, 980, 40, 30, 24, 50]])

# Traitement des valeurs aberrantes
# Solution 1:
#max_values = scaler.inverse_transform(np.expand_dims(scaler.mean_, axis=0))
#min_values = scaler.inverse_transform(np.expand_dims([-scaler.scale_[0], -scaler.scale_[1], -scaler.scale_[2], -scaler.scale_[3]], axis=0))

# Solution 2:
max_values = scaler.inverse_transform(scaler.mean_.reshape(1, -1))
min_values = scaler.inverse_transform((-scaler.scale_).reshape(1, -1))

if np.any(np.isnan(new_observation)) or np.any(new_observation > max_values[0]) or np.any(new_observation < min_values[0]):

  print("Valeurs aberrantes détectées dans la nouvelle observation. Veuillez les vérifier et les traiter avant de faire la prédiction.")
  exit()

# Prédiction avec le modèle KNN
prediction = model_knn.predict(scaler.transform(new_observation))

# Décodage de la prédiction
niveau_qualite_air = le.inverse_transform([prediction])[0]
print("Qualité de l'air prédite :", niveau_qualite_air)

# Enregistrer la dataset réduite en csv
fichier_sortie_csv = "air_quality_reduced_dataset.csv"
df.to_csv(fichier_sortie_csv, index=False)

# Message de confirmation
print("Dataset réduite en csv enregistrée dans le fichier", fichier_sortie_csv)

# Enregistrer la dataset réduite en excel
fichier_sortie_xlsx = "excel.xlsx"
df.to_excel(fichier_sortie_xlsx, index=False)

# Message de confirmation
print("Dataset réduite en excel enregistrée dans le fichier", fichier_sortie_xlsx)




