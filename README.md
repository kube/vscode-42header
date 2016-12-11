<img
  src="https://raw.githubusercontent.com/kube/vscode-42header/master/42.png" 
  width=128>

# 42 Header for VSCode

This extension provides the 42 header integration in VS Code.

```bash
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    vscode-42header                                    :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: kube <hello@kube.io>                       +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2013/11/18 13:37:42 by kube              #+#    #+#              #
#    Updated: 2016/09/18 13:11:04 by kube             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
```

# Install

Launch Quick Open (`⌘`+`P`) and enter
```
ext install 42header
```

# Usage

### Insert a header
 - **macOS** : `⌘` + `⌥` + `H`
 - **Linux** / **Windows** : `Ctrl` + `Alt` + `H`.

Header is automatically updated on save.


# Configuration

Default values for **username** and **email** are imported from environment variables.

To override these values, specify these properties in *User Settings* :

```ts
{
  "42header.username": string,
  "42header.email": string
}
```


# Issues

To report a bug or ask for a feature, please open a [Github issue](https://github.com/kube/vscode-42header/issues).


# License

MIT
