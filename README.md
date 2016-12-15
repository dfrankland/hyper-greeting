# `hyper-greeting`

Add a nice greeting to each new session created in Hyper.

## Configuration

Edit `~/.hyper.js` file and add these options:

### `config.greeting`

A string; the command to run to output the greeting.

### `config.greetingArgs`

An array of strings as arguments to the `config.greeting`.

## Examples

*   Uses the `fortune` command:

    ```js
    module.exports = {
      config: {
        greeting: 'fortune',
      }
    };
    ```

*   Uses `bash` shell, pipes, `fortune`, and `cowsay`:

    ```js
    module.exports = {
      config: {
        greeting: 'bash',
        greetingArgs: ['-c', 'fortune | cowsay'],
      }
    };
    ```

*   Uses a preloaded `fish` shell function:

    ```js
    module.exports = {
      config: {
        greeting: 'fish',
        greetingArgs: ['-c', 'greeting'],
      }
    };
    ```
