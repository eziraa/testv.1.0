const defaultTheme = {
  // Button colors
  buttonEdit: "#007bff",
  buttonDelete: "#ff5c5c",
  buttonPrimaryBackground: "#0070f3",
  buttonPrimaryHoverBackground: "#005bb5",
  buttonPrimaryColor: "#fff",
  buttonDeleteBackground: "#ff4d4f",
  buttonDeleteHoverBackground: "#d9363e",
  focusOutline: "#0070f3",
  
  // Dialog theme
  overlayBackground: "rgba(0, 0, 0, 0.5)",
  dialogBackground: "#fff",
  dialogBoxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  dialogBoxShadowHover: "0 14px 30px rgba(0, 0, 0, 0.2)",
  dialogCloseColor: "#007bffcc",
  dialogCloseHoverColor: "#007bff",

  // Navbar colors
  navLinkHoverColor: "#0056b3",
  navLinkHoverBg: "#eaeaea",
  navLinkActiveBg: "#0070f3",
  navlinkActiveColor: "#fff",
  // Form colors
};
export const lightTheme = {
  ...defaultTheme,
  // Light theme colors
  background: "#f9f9f9",
  cardBackground: "#ffffff",
  cardShadow: "0 8px 20px rgba(0, 0, 0, 0.07)",
  borderColor: "#eaeaea",

  // Text colors
  textPrimary: "#333333",
  textSecondary: "#555555",

  // Form colors
  formBackground: "#fff",
  formBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",

  inputBackground: "#fff",
  inputTextColor: "#000",
  inputBorder: "#ccc",
  inputFocusBorder: "#007bff",

  errorColor: "red",

  primaryButtonBg: "#007bffdd",
  primaryButtonColor: "#fff",
  primaryButtonHoverBg: "#007bff",

  labelColor: "#333",

  // Navbar colors
  navBackground: "#f3f3f3",
  navLinkColor: "#0070f3",
  // Spinner colors
  spinnerColor: "#0070f3",
  spinnerBackground: "rgba(0, 0, 0, 0.1)",

  // fonts
  font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  border: " #eaeaea",
};

export const darkTheme = {
  // Dark theme colors
  background: "#121212",
  cardBackground: "#1e1e1e",
  cardShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  borderColor: "#333333",

  // Text colors
  textPrimary: "#ffffff",
  textSecondary: "#cccccc",
  ...defaultTheme,

  // Form colors
  formBackground: "#222",
  formBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",

  inputBackground: "#333",
  inputTextColor: "#eee",
  inputBorder: "#555",
  inputFocusBorder: "#3399ff",

  errorColor: "#ff6b6b",

  primaryButtonBg: "#3399ffdd",
  primaryButtonColor: "#fff",
  primaryButtonHoverBg: "#3399ff",

  labelColor: "#eee",

  // Navbar colors
  navBackground: "#1e1e1e",
  navLinkColor: "#66aaff",

  // Spinner colors
  spinnerColor: "#3399ff",
  spinnerBackground: "rgba(255, 255, 255, 0.1)",
  // fonts
  font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  border: " #333333",
};

export type ThemeType = typeof lightTheme;
