Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Text
Imports System.Security.Cryptography
Imports System.IO


Namespace VisualSoft.Seguridad

    'Advanced Encryption Standard
    Public Class AES_Seguridad
        Public Shared Function DesencriptarAES(_Texto As String) As String
            Dim TextoDesencriptado As String = ""
            Try
                Dim Clave As String = "v1su@ls0ftv1su@l"
                Dim IV_1 As String = DateTime.Now.ToString("yyyyMMddyyyyMMdd")
                Dim keybytes = Encoding.UTF8.GetBytes(Clave)
                Dim iv_2 = Encoding.UTF8.GetBytes(IV_1)
                Dim encrypted = Convert.FromBase64String(_Texto)
                TextoDesencriptado = DecryptStringFromBytes(encrypted, keybytes, iv_2)
            Catch generatedExceptionName As Exception
            End Try
            Return TextoDesencriptado
        End Function
        Public Shared Function EncriptarAES(_Texto As String) As String
            Dim TextoEncriptado As String = ""
            Try
                Dim Clave As String = "v1su@ls0ftv1su@l"
                Dim IV_1 As String = DateTime.Now.ToString("yyyyMMddyyyyMMdd")
                Dim keybytes = Encoding.UTF8.GetBytes(Clave)
                Dim iv_2 = Encoding.UTF8.GetBytes(IV_1)
                Dim decriptedFromJavascript = EncryptStringToBytes(_Texto, keybytes, iv_2)
                TextoEncriptado = Convert.ToBase64String(decriptedFromJavascript)
            Catch generatedExceptionName As Exception
            End Try
            Return TextoEncriptado
        End Function
        Private Shared Function DecryptStringFromBytes(cipherText As Byte(), key As Byte(), iv As Byte()) As String
            If cipherText Is Nothing OrElse cipherText.Length <= 0 Then
                Throw New ArgumentNullException("cipherText")
            End If
            If key Is Nothing OrElse key.Length <= 0 Then
                Throw New ArgumentNullException("key")
            End If
            If iv Is Nothing OrElse iv.Length <= 0 Then
                Throw New ArgumentNullException("key")
            End If

            ' Declare the string used to hold
            ' the decrypted text.
            Dim plaintext As String = Nothing

            ' Create an RijndaelManaged object
            ' with the specified key and IV.
            Using rijAlg = New RijndaelManaged()
                'Settings
                rijAlg.Mode = CipherMode.CBC
                rijAlg.Padding = PaddingMode.PKCS7
                rijAlg.FeedbackSize = 128

                rijAlg.Key = key
                rijAlg.IV = iv

                ' Create a decrytor to perform the stream transform.
                Dim decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV)
                Try
                    ' Create the streams used for decryption.
                    Using msDecrypt = New MemoryStream(cipherText)
                        Using csDecrypt = New CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read)

                            Using srDecrypt = New StreamReader(csDecrypt)
                                ' Read the decrypted bytes from the decrypting stream
                                ' and place them in a string.

                                plaintext = srDecrypt.ReadToEnd()

                            End Using
                        End Using
                    End Using
                Catch
                    plaintext = "keyError"
                End Try
            End Using

            Return plaintext
        End Function
        Private Shared Function EncryptStringToBytes(plainText As String, key As Byte(), iv As Byte()) As Byte()
            ' Check arguments.
            If plainText Is Nothing OrElse plainText.Length <= 0 Then
                Throw New ArgumentNullException("plainText")
            End If
            If key Is Nothing OrElse key.Length <= 0 Then
                Throw New ArgumentNullException("key")
            End If
            If iv Is Nothing OrElse iv.Length <= 0 Then
                Throw New ArgumentNullException("key")
            End If
            Dim encrypted As Byte()
            ' Create a RijndaelManaged object
            ' with the specified key and IV.
            Using rijAlg = New RijndaelManaged()
                rijAlg.Mode = CipherMode.CBC
                rijAlg.Padding = PaddingMode.PKCS7
                rijAlg.FeedbackSize = 128

                rijAlg.Key = key
                rijAlg.IV = iv

                ' Create a decrytor to perform the stream transform.
                Dim encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV)

                ' Create the streams used for encryption.
                Using msEncrypt = New MemoryStream()
                    Using csEncrypt = New CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write)
                        Using swEncrypt = New StreamWriter(csEncrypt)
                            'Write all data to the stream.
                            swEncrypt.Write(plainText)
                        End Using
                        encrypted = msEncrypt.ToArray()
                    End Using
                End Using
            End Using

            ' Return the encrypted bytes from the memory stream.
            Return encrypted
        End Function
    End Class

End Namespace

