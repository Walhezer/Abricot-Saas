/**
 * Extrait les initiales d'un nom complet (ex: "Bertrand Dupont" -> "BD")
 * @param name - Le nom complet de l'utilisateur
 * @returns Les deux premières lettres en majuscules
 */
export const getInitials = (name?: string): string => {
  if (!name) return '';
  
  return name
    .trim()
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};