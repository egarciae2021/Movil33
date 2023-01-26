using System;
using System.IO;
using System.Text;
using System.Security.Cryptography;


namespace VisualSoft.Seguridad
{

    // Advanced Encryption Standard
    public class AES_Seguridad
    {
        public static string DesencriptarAES(string _Texto)
        {
            string TextoDesencriptado = "";
            try
            {
                string Clave = "v1su@ls0ftv1su@l";
                string IV_1 = DateTime.Now.ToString("yyyyMMddyyyyMMdd");
                var keybytes = Encoding.UTF8.GetBytes(Clave);
                var iv_2 = Encoding.UTF8.GetBytes(IV_1);
                var encrypted = Convert.FromBase64String(_Texto);
                TextoDesencriptado = DecryptStringFromBytes(encrypted, keybytes, iv_2);
            }
            catch
            {
            }
            return TextoDesencriptado;
        }
        public static string EncriptarAES(string _Texto)
        {
            string TextoEncriptado = "";
            try
            {
                string Clave = "v1su@ls0ftv1su@l";
                string IV_1 = DateTime.Now.ToString("yyyyMMddyyyyMMdd");
                var keybytes = Encoding.UTF8.GetBytes(Clave);
                var iv_2 = Encoding.UTF8.GetBytes(IV_1);
                var decriptedFromJavascript = EncryptStringToBytes(_Texto, keybytes, iv_2);
                TextoEncriptado = Convert.ToBase64String(decriptedFromJavascript);
            }
            catch 
            {
            }
            return TextoEncriptado;
        }
        private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            if (cipherText == null || cipherText.Length <= 0)
                throw new ArgumentNullException("cipherText");
            if (key == null || key.Length <= 0)
                throw new ArgumentNullException("key");
            if (iv == null || iv.Length <= 0)
                throw new ArgumentNullException("key");

            // Declare the string used to hold
            // the decrypted text.
            string plaintext = null;

            // Create an RijndaelManaged object
            // with the specified key and IV.
            using (var rijAlg = new RijndaelManaged())
            {
                // Settings
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);
                try
                {
                    // Create the streams used for decryption.
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream
                                // and place them in a string.

                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }

            return plaintext;
        }
        private static byte[] EncryptStringToBytes(string plainText, byte[] key, byte[] iv)
        {
            // Check arguments.
            if (plainText == null || plainText.Length <= 0)
                throw new ArgumentNullException("plainText");
            if (key == null || key.Length <= 0)
                throw new ArgumentNullException("key");
            if (iv == null || iv.Length <= 0)
                throw new ArgumentNullException("key");
            byte[] encrypted;
            // Create a RijndaelManaged object
            // with the specified key and IV.
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.
                var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                // Create the streams used for encryption.
                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            // Write all data to the stream.
                            swEncrypt.Write(plainText);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }

            // Return the encrypted bytes from the memory stream.
            return encrypted;
        }
    }
}
